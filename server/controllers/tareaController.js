const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//crear nueva tarea

exports.crearTarea = async (req,res) => {

    // revisar los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
   
    try {


        //extraer proyecto y comprobar si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: "proyecto no encontrado"})
        }

        //revisar si el rpoyecto pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }
        //se crea la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al agregar tarea')
    }
}

//obtener tareas por proyecto 

exports.obtenerTareas = async (req, res ) => {

    try {

        //extraer proyecto y comprobar si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: "proyecto no encontrado"})
        }

        //revisar si el rpoyecto pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }

        //obtener taras por proyecto

        const tarea = await Tarea.find({proyecto});
        res.json({tarea});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las tareas')        
    }
}

//actualizar tarea

exports.actualizarTarea = async (req, res) => {
    try {
        //extraer proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;

        //Si la tarea existe o no
        let  tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({ msg: 'no existe la tarea ' })
        }
        
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar si el rpoyecto pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }

        //crear objetos con la nueva información
        const nuevaTarea = {};

        if (nombre) {
            nuevaTarea.nombre = nombre;
        }
        if (estado) {
            nuevaTarea.estado = estado;
        }

        //guardar la tarea 
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {new:true});
        res.json({ tarea })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar las tareas')        
        
    }
}

//elimina una tarea

exports.eliminarTarea = async (req,res) => {
    try {
        //extraer proyecto y comprobar si existe
        const {proyecto} = req.body;

        //Si la tarea existe o no
        let  tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({ msg: 'no existe la tarea ' })
        }
        
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar si el rpoyecto pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' })
        }

        //eliminar
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada ' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar las tareas')        
        
    }

}