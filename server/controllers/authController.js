const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {

    //revisar los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer email y pw
    const { email, password } = req.body;
    try {

        //revisar qe sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no exsite' })
        }

        //revisar pw
        const passCorecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorecto) {
            return res.status(400).json({ msg: 'password incorrecto' })
        }

        //si todo esta correcto crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;

            //mensaje de confirmacion
            res.json({ token: token })
        });

    } catch (error) {
        Console.log(error);
    }

}