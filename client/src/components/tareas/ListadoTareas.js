import React,{Fragment,useContext} from 'react'
import Tarea from './Tarea'

import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoTareas = () => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyecto,eliminarProyecto } = proyectosContext;
    
    //obtener funcion de context tarea
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;    

    //si el arreglo esta vacio
    if(!proyecto) return <h2> Selecciona un proyecto</h2>

    //array destructuring
    const [proyectoActual] = proyecto;


    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    
                    : 
                        <TransitionGroup>
                         {
                             tareasproyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={200}
                                    //en el css "tarea" tiene unas clases que realizan la animación
                                    classNames="tarea"
                                >
                                    <Tarea                                        
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))
                         }   
                        </TransitionGroup>
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
