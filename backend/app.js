
  // Nous importons ici la dépendance Express .
const express = require('express');
  // Nous importons ici la dépendance Mongoose .
const mongoose = require('mongoose');
 // On importe le model thing .
const Thing = require('./models/thing'); 

// On crées une instance d'Express dans "app" .
const app = express(); 

// Snipet de code qui permet de se connecter a mongoDB .
mongoose.connect('mongodb+srv://limsskoffi:vP5y5CK8i9vQfkU2@clusterfullstack.z4ggvmg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFullStack',
{ userNewUrlParser: true,
   useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'));

  
  // Middleware qui gére les requêtes "Post" du 'FRONT-END' et extrait le corp JSON .
  app.use(express.json());

   //*****// On définis un middleware qui ajoute des en-têtes CORS aux réponses, permettant les requêtes cross-origin . //*****/
app.use((req, res, next) => {
   // Permet à toutes les origines d'accéder à l'API .
   res.setHeader('Access-Control-Allow-Origin', '*');
   // Permet les en-têtes spécifiques dans les requêtes .
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   // Permet les méthodes ("CRUD") HTTP spécifiées .
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   // Passe au middleware suivant dans le cycle de requête-réponse .
   next();
 });

 // On définis  une route POST pour /api/stuff,Ce middleware gère les requêtes POST .
app.post('/api/stuff',(req,res,next)=>{
   delete req.body._id;
   const thing = new Thing({
      ...req.body
   });
   thing.save()
   .then(() => res.status(201).json({message:'Objet enregistré !'}))
   .catch(error => res.status(400).json({error}));
   // // Affiche le corps de la requête dans la console .
   // console.log(req.body);
   // // Envoie une réponse avec un statut 201 et un message JSON .
   // res.status(201).json({
   //    message:'objet créer'
   // });
});

// On définis une route GET pour /api/stuff,Ce middleware gère les requêtes GET .
app.get('/api/stuff', (req, res, next) => {
   // Définition d'un tableau d'objets fictifs à retourner .
   const stuff = [
     {
       _id: 'oeihfzeoi',
       title: 'Mon premier objet',
       description: 'Les infos de mon premier objet',
       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
       price: 4900,
       userId: 'qsomihvqios',
     },
     {
       _id: 'oeihfzeomoihi',
       title: 'Mon deuxième objet',
       description: 'Les infos de mon deuxième objet',
       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
       price: 2900,
       userId: 'qsomihvqios',
     },
   ];
   // Envoie une réponse avec un statut 200 et le tableau d'objets en format JSON .
   res.status(200).json(stuff);
 });
// On exporte l'application Express pour pouvoir l'utiliser dans d'autres fichiers, comme notre fichier server.js.
module.exports = app;