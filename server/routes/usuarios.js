//rutas para crear usuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator')

//Crear un usuario
// api/usuarios
router.post('/',     
    [
        check('name', 'El nombre es obligaotrio').not().isEmpty(),
        check('email','Agregar un email válido').isEmail(),
        check('password', 'El pw debe ser min de 6 carac.').isLength({ min:6 })
    ],
    usuarioController.crearUsuario
);

module.exports = router;