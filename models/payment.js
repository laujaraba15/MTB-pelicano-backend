const { Schema, model } = require('mongoose');
// modelo de pagos 
const PaymentSchema = Schema({

    paymentType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    voucher: {
        type: String,

    },
    idNumber: {
        type: Number,
        uniqued: true,
        required: true

    },
    paidBy: {
        type: String,
        required: true

    }
})
//conversión de la variable _id a pid y despreciando la version de mongo __v
PaymentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object;
})



module.exports = model('Payments', PaymentSchema);