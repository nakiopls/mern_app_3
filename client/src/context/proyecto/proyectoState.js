import React from 'react';

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types'

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';


const ProyectoState = props => {



    const initialState = {
        proyectos : [],
        form : false,
        errorform: false ,
        proyecto: null,
        mensaje: null
    }

    const [state,dispatch] = React.useReducer(proyectoReducer, initialState)

    //funciones 

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener proyectos

    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
            
        } catch (error) {

            const alerta = {
                msg: 'hubo un error al obtener proyectos',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }   

    //agregar proyeto

    const agregarProyecto = async proyecto => {
        //proyecto.id = uuid();
        //insertar proyecto con un dispatch
        try {
            console.log(proyecto);
            //const proyecto_esp = {nombre: proyecto.name}
            //console.log(proyecto_esp);
            const resultado = await clienteAxios.post('/api/proyectos' , proyecto);
            console.log(resultado);
            dispatch ({
                type: AGREGAR_PROYECTO,
                payload: resultado.data 
            })
        } catch (error) {

            const alerta = {
                msg: 'hubo un error al agregar proyectos',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
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
    const eliminarProyecto = async proyectoId => {
        try {

            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {

            const alerta = {
                msg: 'hubo un error al eliminar proyecto',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                form: state.form,
                errorform: state.errorform,
                proyecto: state.proyecto,
                mensaje:state.mensaje,
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
