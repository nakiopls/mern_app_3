//rutas para crear auth

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');

//Crear un usuario
// api/auth
router.post('/',     
    [
        check('email','Agregar un email válido').isEmail(),
        check('password', 'El pw debe ser min de 6 carac.').isLength({ min:6 })
    ],
    authController.autenticarUsuario
);

module.exports = router;