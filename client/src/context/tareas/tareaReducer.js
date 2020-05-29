import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        ESTADO_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA

} from '../../types'

export default(state,action) => {

    switch (action.type) {
        case TAREAS_PROYECTO:
            return{
                ...state,
                tasksproyect: state.tasks.filter(task => task.proyectId === action.payload)
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tasks:[action.payload, ...state.tasks ],
                errortarea: false
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }       
        case ACTUALIZAR_TAREA:            
        case ESTADO_TAREA:
            return{
                ...state,
                tasks: state.tasks.map( task => task.id === action.payload.id ? action.payload : task), 
                taskselect: null
            }     
        case TAREA_ACTUAL:
            return{
                ...state,
                taskselect: action.payload
            }
    
        default:
            return state;

    }

}