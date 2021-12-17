const { response } = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');

const User = require('../models/user');
const { generateJWT } = require('../jwt');


const getUsers = async (req, res) => {

    const users = await User.find();

    res.json({
        ok: true,
        users,

    })


}
// para el posteo de un usuario se requiere en el body los parametros necesarios 
// y se verifica si exite un usuario ya con ese email para evitar duplicados
const postUsers = async (req, res = response) => {

    const { idNumber, name, lastname, phone, email, password, role } = req.body;


    try {

        const emailVerification = await User.findOne({ email });

        if (emailVerification) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }

        const user = new User(req.body);

        //encriptar las contraseñas
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        //usuario guardado en la base de datos
        await user.save();
        const token = await generateJWT(user.id);
        
        // respuesta del usuario y el token
        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }




}

module.exports = {
    getUsers, postUsers
}