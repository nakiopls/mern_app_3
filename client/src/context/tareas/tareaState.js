import React,{useReducer} from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {v4 as uuid} from 'uuid';

import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        ESTADO_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA
} from '../../types'

const TareaState = props => {
    const initialState = {
        tareas: [
            {id:1, nombre: 'asd1', state_:true, proyectId:1},
            {id:2, nombre: 'asd2', state_:false, proyectId:2},
            {id:3, nombre: 'asd3', state_:true, proyectId:3},
            {id:4, nombre: 'asd4', state_:false, proyectId:4},
            {id:5, nombre: 'asd1', state_:true, proyectId:3},
            {id:6, nombre: 'asd2', state_:false, proyectId:4},
            {id:7, nombre: 'asd3', state_:true, proyectId:2},
            {id:8, nombre: 'asd4', state_:false, proyectId:1}
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    const [state,dispatch] = useReducer(TareaReducer,initialState);

    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }
    const agregarTarea = tarea => {
        tarea.id = uuid();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // valida y mostart error

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }   

    //ELIMINAR tarea

    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    //EDITAR estado tarea

    const cambiarEstadoTarea = tarea => {
        dispatch ({
            type:ESTADO_TAREA,
            payload:tarea
        })
    }

    //extraer tarea para editar

    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Editar tarea

    const actualizarTarea = tarea => {
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tarea: state.tarea,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;