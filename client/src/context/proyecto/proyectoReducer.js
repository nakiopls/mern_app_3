import {
        FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
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
        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyects: [...state.proyects, action.payload],
                form: false,
                errorform: false
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorform: true
            }
        case PROYECTO_ACTUAL:
            return{
                ...state,
                // traeme solo el que es igual
                proyect: state.proyects.filter(proyect => proyect.id === action.payload)
            }            
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                //filtes is like a "traeme todos los qe no son iguales"
                proyects: state.proyects.filter(proyect => proyect.id !== action.payload),
                proyect:null
            }
        default:
            return state;
    }
}