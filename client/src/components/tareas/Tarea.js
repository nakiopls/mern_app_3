import React,{useContext} from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyecto/proyectoContext';



const Tarea = ({tarea}) => {

    //obteniendo state proyects desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener funcion de context tarea  
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas,actualizarTarea,guardarTareaActual } = tareasContext;

    //extraer proyect

    const [proyectoActual] = proyecto;

    //funcion para eliminar 
    const tareaEliminar = id => {
        eliminarTarea(id,proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //modificar estado

    const cambiarEstado = tarea => {
        
        /*
        if (tarea.estado){
            tarea.estado = false;
        } else{
            tarea.estado = true
        }
        */
        tarea.estado = !tarea.estado;
        actualizarTarea(tarea);
    }

    //agregar tarea para editar

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra"> 
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
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
                    onClick={() => tareaEliminar(tarea._id)}
                >
                Eliminar
                </button>

            </div>
        </li>
    )
}

export default Tarea
