  // Nous importons ici la dépendance Express .
const express = require('express');
  // Ici nous importons le package mongoose .
const mongoose = require('mongoose');
  // On crées une instance d'Express dans "app" . 
const app = express();
  // On importe le module "path" .
const path = require('node:path')
  // Importation du routeur pour les "things" (objets) depuis le fichier `thing.route.js` dans le dossier `routes`
const thingRoute = require('./routes/thing.route');
  // Importation du routeur pour les utilisateurs depuis le fichier `user.route.js` dans le dossier `routes`
const userRoute = require('./routes/user.route');



  // Ici nous connectons notre app a la BDD MongoDB .
mongoose.connect('mongodb+srv://walidbahij35:Bigboss357@clusterop.x3pwz7h.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOP')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 
  // Ces headers permettent :
app.use((req, res, next) => {
    // Accéder à notre API depuis n'importe quelle origine ( '*' )  .
  res.setHeader('Access-Control-Allow-Origin', '*');
    // D'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) .
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type,Authorization');
    // D'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.) .
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next()
});



  // Un middleware Express qui permet de parser les corps de requêtes JSON .
app.use(express.json());

// L'utilisation du middleware 'thingRoute' pour toutes les routes qui commencent par '/api/stuff'
app.use('/api/stuff', thingRoute);

// L'utilisation du middleware 'userRoute' pour toutes les routes qui commencent par '/api/auth' 
app.use('/api/auth', userRoute);

// indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname) 
// à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

  // On exporte l'application Express pour pouvoir l'utiliser dans d'autres fichiers, comme notre fichier server.js .
module.exports = app