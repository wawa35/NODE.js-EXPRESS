// Importation de Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');
// Importation du plugin mongoose-unique-validator pour valider les champs uniques
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma pour les utilisateurs
const userSchema = mongoose.Schema({
    // Champ email : chaîne de caractères, requis, doit être unique dans la base de données
    email: { type: String, required: true, unique: true },
    // Champ password : chaîne de caractères, requis
    password: { type: String, required: true }
});

// Application du plugin uniqueValidator au schéma pour garantir l'unicité des champs uniques
userSchema.plugin(uniqueValidator);

// Exportation du modèle User basé sur le schéma défini
module.exports = mongoose.model('User', userSchema);



// bcrypt  eest un package proposant une fonction de hachage que vous pouvez installer avec  npm  .

// mongoose-unique-validator  améliore les messages d'erreur lors de l'enregistrement de données uniques.