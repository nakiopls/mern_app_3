import React,{useContext, useState} from 'react'
import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyect } = proyectosContext;

    //obtener funcion de context tarea
    const tareasContext = useContext(tareaContext);
    const {agregarTarea} = tareasContext;


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

        //pasar la validacion

        //agregar nueva tarea al state
        tarea.proyectId = proyectoActual.id;
        tarea.state = false;
        agregarTarea(tarea);
        //reiniicar state

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
                        value="add task"
                    />
                </div>
            </form>
            
        </div>
    )
}

export default FormTarea
