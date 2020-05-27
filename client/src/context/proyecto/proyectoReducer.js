import {
        FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS
} from '../../types'


export default (state,action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                form:true
            }
        case OBTENER_PROYECTOS:
            return{
                ...state,
                proyects: action.payload
            }

        default:
            return state;
    }
}