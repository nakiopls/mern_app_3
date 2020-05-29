import React,{useContext} from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyecto/proyectoContext';



const Tarea = ({tarea}) => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyect } = proyectosContext;

    //obtener funcion de context tarea  
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas,cambiarEstadoTarea,guardarTareaActual } = tareasContext;

    //extraer proyect

    const [proyectoActual] = proyect;

    //funcion para eliminar 
    const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id);
    }

    //modificar estado

    const cambiarEstado = tarea => {
        if (tarea.state_){
            tarea.state_ = false;
        } else{
            tarea.state_ = true
        }
        cambiarEstadoTarea(tarea);
    }

    //agregar tarea para editar

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra"> 
            <p>{tarea.name}</p>
            <div className="estado">
                {tarea.state_
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Completo
                        </button>
                    )  
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Incompleto
                        </button>
                    )  
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                Editar
                </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea.id)}
                >
                Eliminar
                </button>

            </div>
        </li>
    )
}

export default Tarea
