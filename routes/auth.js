const { Router } = require('express');
const { check } = require('express-validator');

const { signin, checkToken } = require('../controllers/auth');

const { fieldValidator } = require('../middlewares/field-validation');
const { jwtvalidator } = require('../middlewares/token-validation');

const router = Router();
//ruta para el inicio de sesión y verificación de los campos en la base de datos (signin)
router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    signin,

);

//ruta para verificar la legitimidad del token generado
router.get('/',

    jwtvalidator,
    checkToken

);


module.exports = router;