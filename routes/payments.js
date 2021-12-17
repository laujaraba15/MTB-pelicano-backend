const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validation');
const { jwtvalidator } = require('../middlewares/token-validation');

const { getPaymentsUser, postPayments, delPayments, getPaymentsAdmin, putPaymentsVoucher } = require('../controllers/payments');

const router = Router();

//ruta para obtener TODOS los pagos (para la vista admin)
router.get('/', jwtvalidator, getPaymentsAdmin);

//ruta para obtener los pagos del usuario en el que el id se recibe como parametro )
router.get('/:id', jwtvalidator, getPaymentsUser);

//ruta de posteo de los pagos junto con las validaciones y la revision del token legitimo
router.post('/',
    [
        jwtvalidator,
        check('idNumber', 'El id del debitante es obligatorio').not().isEmpty(),
        check('paidBy', 'El nombre del debitante es obligatorio').not().isEmpty(),
        check('paymentType', 'El tipo de pago es obligatorio').not().isEmpty(),
        check('date', 'Fecha es obligatoria obligatoria').not().isEmpty(),
        check('description', 'La descriptción es obligatoria').not().isEmpty(),
        fieldValidator

    ],
    postPayments
);

//ruta para borrar un pago recibiendo como parametro el ID
router.delete('/:id',
    jwtvalidator,
    delPayments);

module.exports = router;