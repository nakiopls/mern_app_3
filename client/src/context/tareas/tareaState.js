import React,{useReducer} from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';


import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA
} from '../../types'

import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    const [state,dispatch] = useReducer(TareaReducer,initialState);

    const obtenerTareas = async proyecto => {
        //console.log(proyecto);
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            //console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas',tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    // valida y mostart error

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }   

    //ELIMINAR tarea por id

    const eliminarTarea = async (id, proyecto) => {
        
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
            
        }

    }

    //Editar tarea

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            //console.log(resultado);
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload: resultado.data.tarea 
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    //extraer tarea para editar

    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }



    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;