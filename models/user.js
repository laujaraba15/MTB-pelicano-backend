const { Schema, model } = require('mongoose');
//modelo de usuaio
const UserSchema = Schema({
    idNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'usuario'
    }
})
//conversión del modelo cambiando _id por uid y despreciando la version de mongo __v
UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Users', UserSchema);