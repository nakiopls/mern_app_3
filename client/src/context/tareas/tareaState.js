import React,{useReducer} from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer'

import {TAREAS_PROYECTO,
        AGREGAR_TAREA
} from '../../types'

const TareaState = props => {
    const initialState = {
        tasks: [
            {name: 'asd1', state:true, proyectId:1},
            {name: 'asd2', state:false, proyectId:2},
            {name: 'asd3', state:true, proyectId:3},
            {name: 'asd4', state:false, proyectId:4},
            {name: 'asd1', state:true, proyectId:3},
            {name: 'asd2', state:false, proyectId:4},
            {name: 'asd3', state:true, proyectId:2},
            {name: 'asd4', state:false, proyectId:1}
        ],
        tasksproyect: null
    }

    const [state,dispatch] = useReducer(TareaReducer,initialState);

    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }
    const agregarTarea = tarea => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tasks: state.tasks,
                tasksproyect: state.tasksproyect,
                obtenerTareas,
                agregarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;