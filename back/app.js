  // Nous importons ici la dépendance Express .
const express = require('express');
  // Ici nous importons le package mongoose .
const mongoose = require('mongoose');
  // Ici nous importons notre model
const thingModel = require('./models/thing');
  // On crées une instance d'Express dans "app" . 
const app = express();
  // Ici  on importe notre route .
const thingRoute = require('./routes/thing.route');



  // Ici nous connectons notre app a la BDD MongoDB .
mongoose.connect('mongodb+srv://walidbahij35:Bigboss357@clusterop.x3pwz7h.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOP')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 






  // Ces headers permettent :
app.use((req, res, next) => {
    // Accéder à notre API depuis n'importe quelle origine ( '*' )  .
  res.setHeader('Access-Control-Allow-Origin', '*');
    // D'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) .
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // D'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.) .
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next()
});


  // Un middleware Express qui permet de parser les corps de requêtes JSON .
app.use(express.json());
app.use('/api/stuff', thingRoute);

// Place au CRUD grâce au middleware POST , GET , PUT , DELETE //







// app.post('./api/stuff'(req,res,next) =>{

// })

//   // Route POST pour le chemin '/api/stuff'
// app.post('/api/stuff', (req, res, next) => {
//     // Ici on supprime l'ID renvoyer par le  front car la BDD en crée un automatiquement .
//   delete req.body._id;
//     // On crée une instance de notre modèle thing .
//   const thing = new thingModel({
//      // Copie des champs dans thing grâce au spread operator '...' .
//      ...req.body
//   });
//      // On enregistre thing dans la base de donnée grâce a la méthode "save()" .
//   thing.save()
//     .then(() => res.status(201).json({message:'Objet enregistré !'}))
//     .catch(error => res.status(400).json({error}));
// });




//   // Ici nous implémentons une requéte GET pour qu'elle renvoi tout les "Things" dans la BDD .
// app.use('/api/stuff', (req, res, next) => {
//     // La méthode '.find' nous renvoie un tableau contenant tout les "Things" de notre BDD .
//     Thing.find()
//       .then(things => res.status(200).json(things))
//       .catch(error => res.status(400).json({ error }));
//   });





//   // On utilise la méthode get() pour répondre uniquement aux demandes GET à cet endpoint .
//     //  On utilise deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre .
// app.get('/api/stuff/:id',(req,res,next) => {
//     // On utilise ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ;
//   Thing.findOne({_id: req.params.id})
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({error})); 
//       //Ce middleware récupère un objet unique par son ID depuis la base de données.
// });



// // On utilise une requête PUT pour mettre à jour un objet existant dans la base de données
// app.put('/api/stuff/:id', (req, res, next) => {
  
//   // Utilise la méthode updateOne() de notre modèle 'Thing' pour mettre à jour l'objet
//   // Le premier argument est un objet de filtre pour trouver l'objet par son _id
//   // Le deuxième argument est un nouvel objet contenant les champs mis à jour
//   Thing.updateOne(
//     { _id: req.params.id },          // Filtrer l'objet par l'_id provenant des paramètres de la requête
//     { ...req.body, _id: req.params.id } // Copier les champs de req.body et forcer l'_id à rester le même
//   )
//    .then(() => 
//     // Si la mise à jour réussit, envoyer une réponse avec un statut 200 et un message de succès
//      res.status(200).json({ message: 'Objet modifié !' })
//   )
//    .catch(error => 
//     // Si la mise à jour échoue, envoyer une réponse avec un statut 400 et l'erreur
//      res.status(400).json({ error })
//   );
// });




// // On utilise une requête DELETE pour supprimer un objet existant dans la base de données
// app.delete('/api/stuff/:id', (req, res, next) => {
//   // Utilise la méthode deleteOne() de notre modèle 'Thing' pour supprimer l'objet
//   // Le filtre pour la suppression est basé sur l'_id provenant des paramètres de la requête
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => 
//       // Si la suppression réussit, envoyer une réponse avec un statut 200 et un message de succès
//       res.status(200).json({ message: 'Objet supprimé !' })
//     )
//     .catch(error => 
//       // Si la suppression échoue, envoyer une réponse avec un statut 400 et l'erreur
//       res.status(400).json({ error })
//     );
// });








  // On exporte l'application Express pour pouvoir l'utiliser dans d'autres fichiers, comme notre fichier server.js .
module.exports = app