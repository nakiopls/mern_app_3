const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')


exports.crearProyecto = async (req, res) => {

    // revisar los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //creacr nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //guardar el crador via JWT
        proyecto.creador = req.usuario.id;

        //guardar proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtner proyectos del usuario actual

exports.obtenerProyectos = async (req, res) => {

    try {
        //console.log(req.usuario);
        const proyectos = await Proyecto.find({ creador: req.usuario.id });
        res.json({ proyectos });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualizar proyecto

exports.actualizarProyecto = async (req, res) => {

    // revisar los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //extraer informacion del proyecto

    //console.log(req.body.nombre);
    //console.log(req.body);


    const { nombre } = req.body;
    const nuevoProyecto = {};

    //console.log("nombre", nombre)

    if (nombre) {
        nuevoProyecto.nombre = nombre
        //console.log("if",nuevoProyecto)
    }

    try {

        //revisar ID
        //console.log(req.params.id);

        let proyecto = await Proyecto.findById(req.params.id);

        //console.log(proyecto)
        //si existe el proyecto
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //verificar el creador del proyecto
        //console.log("req.usuario.id",req.usuario.id)
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }

        //console.log(nuevoProyecto)

        //actualizar proyecto
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });

        //console.log(proyecto)

        res.json({ proyecto });

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor al actualizar')
    }

}

//Elimina un proyecto

exports.eliminarProyecto = async (req, res) => {

    try {

        //revisar ID
        let proyecto = await Proyecto.findById(req.params.id);

        //si existe el proyecto
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }

        //eliminar proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id});
        res.json({ msg: 'Proyecto eliminado' });

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor al eliminar')
    }



}