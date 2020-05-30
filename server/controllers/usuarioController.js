const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req,res) => {

    //revisar los errores
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    //extraer email y password 
    const { email,password } = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json( { msg: 'El usuario ya existe' } )
        }


        //crea el nuevo usaurio
        usuario = new Usuario(req.body);

        //hashear pw
        const salt = await bcryptjs.genSalt(10); // agregar "ruido" a la pw
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar
        await usuario.save();

        //Crea y firma el JWT
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
        console.log(error);
        res.status(400).send("hubo un error")
    }
}
