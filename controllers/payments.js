const { response } = require('express');

const Payments = require('../models/payment');

//metodo para obtener los pagos del usuario recibiendo como parametro el id que viene de la request y se envia 
//el pago de la base datos que haga match
const getPaymentsUser = async (req, res = response) => {
    const id = req.params.id;
    const paymentsDB = await Payments.find({ idNumber: id })

    res.json({
        ok: true,
        paymentsDB,


    })
}
//metodo para obtener todos pagos de la base de datos
const getPaymentsAdmin = async (req, res = response) => {

    const paymentsDB = await Payments.find();

    res.json({
        ok: true,
        paymentsDB
    })
}
//metodo para crear pagos nuevos recibiendo como parametro los datos del mismo
//se envia el id del usuario para filtrar despues
const postPayments = async (req, res = response) => {

    const { paymentType, date, description, voucher, paidBy, idNumber } = req.body;
    const uid = req.uid;
    const payment = new Payments({
        User: uid,
        ...req.body
    });

    const paymentDB = await payment.save();

    res.json({
        ok: true,
        paymentDB
    });
}


// metodo para eliminar los pagos en el que se recibe como parametro el ID
const delPayments = async (req, res = response) => {

    const pid = req.params.id;
    try {

        const paymentDB = await Payments.findById(pid);

        if (!paymentDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe le pago'
            });
        }

        await Payments.findOneAndDelete(pid);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al intetar borrar'
        })
    }
    res.json({
        ok: true,
        msg: 'Pago borrado exitosamente'
    })
}



module.exports = {
    getPaymentsUser, getPaymentsAdmin, postPayments, delPayments
}