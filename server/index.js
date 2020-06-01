const express = require('express');
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

//Conectar    a la DB

conectarDB();

// habilitar express.json, sino trabajar con bodyparse
app.use( express.json({ extend: true }))

//puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas
//midwaller
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


// Definir la pagina principal
//app.get('/', (req, res) => {
//    res.send('Hola ')
//})

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})