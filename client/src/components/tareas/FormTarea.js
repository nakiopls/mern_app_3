import React,{useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener funcion de context tarea
    const tareasContext = useContext(tareaContext);
    const { errortarea,tareaseleccionada,agregarTarea,validarTarea,obtenerTareas,actualizarTarea } = tareasContext;

    //detecta tarea seleccionada

    useEffect(() => {
        if(tareaseleccionada !== null){
            setTarea(tareaseleccionada)
        } else{
            setTarea({
                nombre:''
            })
        }
    },[tareaseleccionada]); //detecta cuando la tarea seleccionada cambia 

    //state del form agregar tarea
    const[tarea, setTarea] = useState ({
        nombre: ''
    })

    const { nombre } = tarea

    //si el arreglo esta vacio y no hay proyecto seleccionado
    if(!proyecto) return null;

    //array destructuring para obtener el proyecto seleccionado
    const [proyectoActual] = proyecto;

    const handleChange = e => {
        //console.log(e.target.value)
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //revisar si es edicion o agregar tarea

        if(tareaseleccionada === null) {            
            //agregar nueva tarea al state
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualziar tarea existente
            actualizarTarea(tarea);
        }



        obtenerTareas(proyectoActual.id);

        //reiniicar state
        setTarea({
            nombre: ''
        })

    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea ..."
                        name="nombre"    
                        value= {nombre}
                        onChange={handleChange}               
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error"> Nombre de la tarea obligatorio </p> : null}
        </div>
    )
}

export default FormTarea
