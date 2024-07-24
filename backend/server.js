const http = require('http'); // Importe le module HTTP natif de Node.js, utilisé pour créer un serveur HTTP.
const app = require('./app'); // Importe l'application Express à partir du fichier 'app.js'.

// Fonction pour normaliser le port en un nombre ou une chaîne de caractères valide.
const normalizePort = val => {
  const port = parseInt(val, 10); // Convertit 'val' en un entier en base 10.

  if (isNaN(port)) {
    return val; // Si 'port' n'est pas un nombre, retourne la valeur initiale.
  }
  if (port >= 0) {
    return port; // Si 'port' est un nombre positif, le retourne.
  }
  return false; // Sinon, retourne 'false'.
};

const port = normalizePort(process.env.PORT || '3000'); // Normalise le port à partir de la variable d'environnement ou utilise '3000' par défaut.
app.set('port', port); // Définit le port pour l'application Express.

// Fonction pour gérer les erreurs du serveur.
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error; // Si l'erreur n'est pas liée à l'écoute du serveur, lance l'erreur.
  }
  const address = server.address(); // Récupère l'adresse du serveur.
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; // Définit 'bind' pour décrire l'adresse (soit un pipe, soit un port).

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.'); // Si le port nécessite des privilèges élevés, affiche un message d'erreur.
      process.exit(1); // Quitte le processus avec un code d'erreur.
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.'); // Si le port est déjà utilisé, affiche un message d'erreur.
      process.exit(1); // Quitte le processus avec un code d'erreur.
      break;
    default:
      throw error; // Pour toute autre erreur, lance l'erreur.
  }
};

const server = http.createServer(app); // Crée un serveur HTTP en utilisant l'application Express.

server.on('error', errorHandler); // Écoute les événements 'error' et utilise 'errorHandler' pour les gérer.
server.on('listening', () => {
  const address = server.address(); // Récupère l'adresse du serveur.
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; // Définit 'bind' pour décrire l'adresse (soit un pipe, soit un port).
  console.log('Listening on ' + bind); // Affiche un message indiquant sur quel bind le serveur écoute.
});

server.listen(port); // Le serveur commence à écouter les requêtes sur le port défini.
