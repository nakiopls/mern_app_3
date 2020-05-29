import React,{useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyect } = proyectosContext;

    //obtener funcion de context tarea
    const tareasContext = useContext(tareaContext);
    const { errortarea,taskselect,agregarTarea,validarTarea,obtenerTareas,actualizarTarea } = tareasContext;

    //detecta tarea seleccionada

    useEffect(() => {
        if(taskselect !== null){
            setTarea(taskselect)
        } else{
            setTarea({
                name:''
            })
        }
    },[taskselect]); //detecta cuando la tarea seleccionada cambia 

    //state del form agregar tarea
    const[tarea, setTarea] = useState ({
        name: ''
    })

    const { name } = tarea

    //si el arreglo esta vacio y no hay proyecto seleccionado
    if(!proyect) return null;

    //array destructuring para obtener el proyecto seleccionado
    const [proyectoActual] = proyect;

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //Validar
        if(name.trim() === ''){
            validarTarea();
            return;
        }

        //revisar si es edicion o agregar tarea

        if(taskselect === null) {            
            //agregar nueva tarea al state
            tarea.proyectId = proyectoActual.id;
            tarea.state = false;
            agregarTarea(tarea);
        } else {
            //actualziar tarea existente
            actualizarTarea(tarea);
        }



        obtenerTareas(proyectoActual.id);

        //reiniicar state
        setTarea({
            name: ''
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
                        name="name"    
                        value= {name}
                        onChange={handleChange}               
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={taskselect ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error"> Nombre de la tarea obligatorio </p> : null}
        </div>
    )
}

export default FormTarea
