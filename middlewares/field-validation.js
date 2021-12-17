const { response } = require('express');
const { validationResult } = require('express-validator')

//metod opara validar los campos que son enviados en las requests

const fieldValidator = (req, res = response, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }

    next();
}

module.exports = {
    fieldValidator
}