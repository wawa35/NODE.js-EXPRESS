const jwt = require('jsonwebtoken'); 
const User = require('../models/user.models');
const bcrypt= require('bcrypt');
const mdpTkn =  'CaputDraconis'
// Fonction pour gérer l'inscription des utilisateurs
exports.signup = (req, res, next) => {
    // Utilisation de bcrypt pour hasher le mot de passe avant de le stocker grâce a la fonction hash()
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        // Création d'un nouvel utilisateur avec l'email et le mot de passe hashé
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // Sauvegarde de l'utilisateur dans la base de données
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            // Gestion des erreurs lors de la sauvegarde
            .catch(error => res.status(400).json({ message:'Erreur lors de la création du compte !' }));
    })
    // Gestion des erreurs lors du hachage du mot de passe
    .catch(error => res.status(500).json({ error }));
};
//    La méthode  hash()  de bcrypt crée un hash crypté des mots de passe de vos utilisateurs pour les enregistrer de manière sécurisée dans la base de données.


// Fonction pour gérer la connexion des utilisateurs
exports.login = (req, res, next) => {
    // Recherche d'un utilisateur dans la base de données avec l'email fourni
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si aucun utilisateur n'est trouvé avec cet email
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            // Comparaison du mot de passe fourni avec le mot de passe hashé stocké grâce a la fonction compare()
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si le mot de passe fourni est incorrect
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    // Réponse avec un statut 200 et les informations de l'utilisateur
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },mdpTkn,{ expiresIn: '48h' }) 
                    });
                })
                // Gestion des erreurs lors de la comparaison des mots de passe
                .catch(error => res.status(500).json({ error }));
        })
        // Gestion des erreurs lors de la recherche de l'utilisateur
        .catch(error => res.status(500).json({ error }));
};
