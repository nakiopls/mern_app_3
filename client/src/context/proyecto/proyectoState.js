import React from 'react';

import {v4 as uuid} from 'uuid';

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types'

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
        form : false,
        errorform: false ,
        proyect: null
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

    //agregar proyeto

    const agregarProyecto = proyecto => {
        proyecto.id = uuid();
        //insertar proyecto con un dispatch
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    //Validar el formuladio
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Seleccionar proyecto 
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Eliminar proyecto 
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return(
        <proyectoContext.Provider
            value={{
                proyects: state.proyects,
                form: state.form,
                errorform: state.errorform,
                proyect: state.proyect,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;
