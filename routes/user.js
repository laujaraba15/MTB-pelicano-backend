const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation');
const { jwtvalidator } = require('../middlewares/token-validation');

const { getUsers, postUsers } = require('../controllers/user');

const router = Router();
//Routa para obtener los Usuarios registrados
router.get('/', jwtvalidator, getUsers);

//Routa para ingresar los Usuarios al registro y la verificación con el fieldValidator creado
router.post('/',
    [
        check('idNumber', 'La identificación es obligatoria').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastname', 'Los apellidos son obligatorios').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    postUsers,
);


module.exports = router;