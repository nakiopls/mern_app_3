import React,{useContext} from 'react'
import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';



const Proyecto = ({proyecto}) => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    //obtener funcion de context tarea
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    //agregar proyecto actual
    const selecionarProyecto = id => {
        proyectoActual(id);//Fija el proyecto actual
        obtenerTareas(id);// Filtrar las tareas cuando se de click
    }


    return (
        <li>
            <button
                type="button"
                className="btn btn-blank-list"
                onClick={() => selecionarProyecto(proyecto._id)}
            >
            {proyecto.nombre}
            </button>            
        </li>
    )
}

export default Proyecto;
