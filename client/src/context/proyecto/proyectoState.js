import React from 'react'

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS} 
from '../../types'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'


const ProyectoState = props => {

    const proyects = [
        {id: 1 , name: "asd1"},
        {id: 2 , name: "asd2"},
        {id: 3 , name: "asd3"},
        {id: 4 , name: "asd4"}
    ]

    const initialState = {
        proyects : [],
        form : false
    }

    const [state,dispatch] = React.useReducer(proyectoReducer, initialState)

    //funciones 

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener proyectos

    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyects
        })
    }

    return(
        <proyectoContext.Provider
            value={{
                proyects: state.proyects,
                form: state.form,
                mostrarFormulario,
                obtenerProyectos
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;
