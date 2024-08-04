// Importation du module `jsonwebtoken` qui permet de créer et vérifier des JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');

const mdpTkn =  'CaputDraconis'
// Exportation d'un middleware Express pour vérifier l'authenticité des requêtes
module.exports = (req, res, next) => {

    try {
        // Extraction du token JWT de l'en-tête `Authorization` de la requête
        // Le format attendu est "Bearer <token>", donc on divise la chaîne par l'espace et récupère le token (2ème élément)

        const token = req.headers.authorization.split(' ')[1];
        // Vérification du token en utilisant une clé secrète (`RANDOM_TOKEN_SECRET`)
        // Si le token est valide, il est décodé en un objet contenant les données encodées dans le token
        const decodedToken = jwt.verify(token,mdpTkn);

        // Extraction de l'ID utilisateur (userId) à partir du token décodé
        const userId = decodedToken.userId;

        // Ajout de l'ID utilisateur décodé à l'objet `req.auth` pour pouvoir y accéder dans les routes suivantes
        req.auth = {
            userId: userId
        };

        // Appel de la fonction `next()` pour passer au middleware suivant ou à la route suivante
        next();
    } catch ( error ) {
        // Si une erreur se produit, par exemple si le token est invalide ou manquant, une réponse 401 est envoyée
        // Le code 401 signifie "Unauthorized", indiquant que l'accès à la ressource est refusé
        res.status(401).json({ "msg": "p", "err": error });
    }
};
