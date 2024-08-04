// Importation d'Express.js pour créer un routeur
const express = require('express');

// Création d'une nouvelle instance de routeur Express
const router = express.Router();

// Importation du contrôleur des utilisateurs
const userCtrl = require('../controller/user.controller');

// Route pour l'inscription d'un utilisateur (signup)
router.post('/signup', userCtrl.signup);

// Route pour la connexion d'un utilisateur (login)
router.post('/login', userCtrl.login);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;