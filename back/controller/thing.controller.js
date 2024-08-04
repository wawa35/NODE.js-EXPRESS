const Thing = require('../models/thing.models');
const fs = require('fs')

exports.createThing = (req, res, next) => {

    console.log('req.body:', req.body); // Voir le contenu de req.body
    console.log('req.file:', req.file); // Voir le contenu de req.file

    if (!req.body.thing) {
        return res.status(400).json({ error: 'No data provided' });
    }


    let thingObject ;
    try{
    thingObject = JSON.parse(req.body.thing);}
    catch{
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    delete thingObject._id;
    delete thingObject._userId;

    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    thing.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };




exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then((things) => {
            res.status(200).json(things);
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    // Récupère tous les objets "Thing" de la base de données et les renvoie en réponse ou renvoie une erreur.
};



exports.getThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    })
    .then((thing) => {
        res.status(200).json(thing);
    })
    .catch((error) => {
        res.status(404).json({
            error: error
        });
    });
    // Récupère un objet "Thing" spécifique par son ID et le renvoie en réponse ou renvoie une erreur si non trouvé.
};


exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
   
    delete thingObject._userId;
    Thing.findOne({_id: req.params.id})
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };



exports.deleteThing = (req, res, next) => {
    // Recherche de l'objet Thing dans la base de données en fonction de l'ID fourni dans les paramètres de la requête
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            // Vérifie si l'utilisateur authentifié est bien le propriétaire de l'objet
            if (thing.userId != req.auth.userId) {
                // Si l'utilisateur n'est pas autorisé, envoie une réponse HTTP 401 (non autorisé)
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                // Si l'utilisateur est autorisé, traite la suppression de l'objet
                // Extraction du nom du fichier image à partir de l'URL de l'image
                const filename = thing.imageUrl.split('/images/')[1];
                // Suppression du fichier image du système de fichiers
                fs.unlink(`images/${filename}`, () => {
                    // Suppression de l'objet Thing dans la base de données
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => {
                            // Envoie une réponse HTTP 200 (succès) avec un message de confirmation
                            res.status(200).json({ message: 'Objet supprimé !' });
                        })
                        .catch(error => {
                            // En cas d'erreur lors de la suppression de l'objet, envoie une réponse HTTP 401 (non autorisé) avec l'erreur
                            res.status(401).json({ error });
                        });
                });
            }
        })
        .catch(error => {
            // En cas d'erreur lors de la recherche de l'objet, envoie une réponse HTTP 500 (erreur serveur) avec l'erreur
            res.status(500).json({ error });
        });
};


// Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application.https://cloud.mongodb.com/v2/66a61b1ba700ae3955e43317#/deviceSync