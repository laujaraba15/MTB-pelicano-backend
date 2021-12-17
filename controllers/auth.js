const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { generateJWT } = require('../jwt');

const User = require('../models/user');

const signin = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        //Verificación de la existencia del email en la base de datos
        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales invalidas'
            })
        }

        //Verificación de la contraseña en la base de datos
        const validPass = bcrypt.compareSync(password, checkUser.password);
        if (!validPass) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales invalidas'
            })
        }

        //JWT Generator
        const token = await generateJWT(checkUser.id);
        const user = await User.findById(checkUser.id)

        res.json({
            ok: true,
            token,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de autenticación'
        })

    }



}

const checkToken = async (req, res = response) => {

    const uid = req.uid;


    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token,

    })

}




module.exports = { signin, checkToken }