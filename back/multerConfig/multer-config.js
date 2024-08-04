const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// //Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
  //Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type 
module.exports = multer({storage: storage}).single('image');
 // et les enregistre au système de fichiers du serveur à l'aide du storage configuré.