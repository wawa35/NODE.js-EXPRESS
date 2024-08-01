  // Ici on appel le package Mongoose .
const mongoose = require('mongoose');

  // Ici nous créeons un schémas de données via mongoose pour forcer l'affichage des produits comme on le souhaite .
const thingSchema = mongoose.Schema({
    title:{type: String , required: true } ,
    description:{type: String , required: true },
    imageUrl:{type: String , required: true  } ,
    userId:{type: String , required: true} ,
    price:{type: Number , required: true} ,
});

  // Ici nous exportons le schémas en tant que modèle Mongoose 'Thing' , on le rend dispo sur notre app Express .
module.exports = mongoose.model('Thing' , thingSchema );