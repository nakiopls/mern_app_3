import React,{Fragment,useContext} from 'react'
import Tarea from './Tarea'

import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const ListadoTareas = () => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyect,eliminarProyecto } = proyectosContext;
    
    //obtener funcion de context tarea
    const tareasContext = useContext(tareaContext);
    const {tasksproyect} = tareasContext;    

    //si el arreglo esta vacio
    if(!proyect) return <h2> Selecciona un proyecto</h2>

    //array destructuring
    const [proyectoActual] = proyect;


    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.name} </h2>

            <ul className="listado-tareas">
                {tasksproyect.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    
                    : tasksproyect.map(tarea => (
                        <Tarea
                            tarea={tarea}
                        />
                    ))
                }
            </ul>
            <button
                type="button"
                className="btn btn-elimnar"
                onClick={onClickEliminar}
            >
            Eliminar Proyecto &times;
            </button>

        </Fragment>
    )
}

export default ListadoTareas
