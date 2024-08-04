// Ici on importe le package HTTP natif de Node pur gérez les requetes et response .
const http = require('http');

// On importe le module app depuis le fichier app.js dans la variable app.
const app = require('./app');

// Fonction pour normaliser le port en un nombre valide ou une chaîne.
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {  // Si ce n'est pas un nombre, retourne la valeur d'origine.
        return val;
    }
    if (port >= 0) {    // Si le port est un nombre positif, retourne le port.
        return port;
    }
    return false;       // Sinon, retourne false.
};

// Définir le port pour l'application, à partir de la variable d'environnement ou 3000 par défaut.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Gestionnaire d'erreurs pour le serveur.
const errorHandler = error => {
    if (error.syscall !== 'listen') {  // Si l'erreur n'est pas liée à l'écoute du serveur, lance l'erreur.
        throw error;
    }

    const address = server.address();  // Récupère l'adresse du serveur.
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;

    switch (error.code) {  // Gère différents codes d'erreurs.
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);  // Quitte le processus avec un code d'échec.
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);  // Quitte le processus avec un code d'échec.
            break;
        default:
            throw error;  // Pour d'autres erreurs, lance l'erreur.
    }
};

// On utilise le package HTTP pour créer un serveur avec l'application express.
const server = http.createServer(app);

server.on('error', errorHandler);  // Attache le gestionnaire d'erreurs au serveur.

// Événement lorsque le serveur commence à écouter.
server.on('listening', () => {
    const address = server.address();  // Récupère l'adresse du serveur.
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);  // Affiche un message indiquant sur quel port/pipeline le serveur écoute.
});

// Le serveur écoute sur le port défini.
server.listen(port);
