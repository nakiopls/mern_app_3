import {TAREAS_PROYECTO,
        AGREGAR_TAREA

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
                tasks:[...state.tasks, action.payload],
                tasksproyect: [...state.tasks, action.payload]
            }
        
        default:
            return state;

    }

}