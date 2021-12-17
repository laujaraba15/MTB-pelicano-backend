const jwt = require('jsonwebtoken');

//metodo para validar el token en el que se recibe en los headers el token (tokenx),
const jwtvalidator = (req, res, next) => {

    const token = req.header('tokenx');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }
    //en los enviroments se establece el token key personal (process.env.JWT)
    try {
        const { uid } = jwt.verify(token, process.env.JWT);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })

    }


}
module.exports = { jwtvalidator }