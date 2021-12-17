const jwt = require('jsonwebtoken');
const User = require('./models/user');

//Metodo para generar un JWT a través del UID el cual retorna el UID
const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {


        const payload = {
            uid

        };

        jwt.sign(payload, process.env.jwt, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });

    });

}

module.exports = {
    generateJWT
}