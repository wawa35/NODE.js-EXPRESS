// Importation du module Express pour créer le routeur
const express = require('express');
// Création d'un routeur Express
const router = express.Router();
// Importation des fonctions du controleur pour gérer l'authentification .
const auth = require('../middleware/auth');
// Importation des fonctions du contrôleur pour gérer les opérations sur les objets
const controlThing = require('../controller/thing.controller');
// Importation du module Multer
const multer = require('../multerConfig/multer-config')

// Route POST pour créer un nouvel objet, utilise la fonction createThing du contrôleur
router.post('/', auth, multer, controlThing.createThing);
// Cette route accepte des requêtes POST à l'URL racine ('/'). Elle est protégée par le middleware d'authentification (`auth`) et utilise `multer` pour gérer les fichiers téléchargés. Ensuite, elle appelle la méthode `createThing` du contrôleur pour créer un nouvel objet dans la base de données.


// Route GET pour obtenir tous les objets, utilise la fonction getAllThing du contrôleur
router.get('/', controlThing.getAllThing);
// Cette route accepte des requêtes GET à l'URL racine ('/'). Elle est également protégée par le middleware d'authentification (`auth`). Une fois l'utilisateur authentifié, elle appelle la méthode `getAllThing` du contrôleur pour récupérer et renvoyer tous les objets de la base de données.


// Route GET pour obtenir un objet spécifique par son ID, utilise la fonction getThing du contrôleur
router.get('/:id', controlThing.getThing);
// Cette route accepte des requêtes GET à l'URL '/:id', où ':id' est un paramètre dynamique représentant l'ID de l'objet. Après vérification de l'authentification avec `auth`, elle appelle la méthode `getThing` du contrôleur pour récupérer et renvoyer l'objet spécifique correspondant à l'ID fourni.


// Route PUT pour mettre à jour un objet spécifique par son ID, utilise la fonction modifyThing du contrôleur
router.put('/:id', auth, multer, controlThing.modifyThing);
// Cette route accepte des requêtes PUT à l'URL '/:id', utilisée pour mettre à jour un objet spécifique identifié par son ID. Elle est protégée par `auth` et utilise `multer` si la mise à jour implique des fichiers. Ensuite, elle appelle la méthode `modifyThing` du contrôleur pour effectuer la mise à jour dans la base de données.


// Route DELETE pour supprimer un objet spécifique par son ID, utilise la fonction deleteThing du contrôleur
router.delete('/:id', auth, controlThing.deleteThing);
// Cette route accepte des requêtes DELETE à l'URL '/:id', utilisée pour supprimer un objet spécifique identifié par son ID. Elle est protégée par `auth` et appelle la méthode `deleteThing` du contrôleur pour supprimer l'objet de la base de données.

// Exportation du routeur pour l'utiliser dans d'autres fichiers de l'application
module.exports = router;


// La méthode express.Router()  vous permet de créer des routeurs séparés pour chaque route principale de votre application – vous y enregistrez ensuite les routes individuelles.