import React, {useContext,useEffect} from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyecto/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

import {TransitionGroup, CSSTransition} from 'react-transition-group'


const ListadoProyectos = () => {

    //Obtener estados desde el context
    const proyectosContext = useContext(proyectoContext);
    const { mensaje,proyectos,obtenerProyectos } = proyectosContext;    

    const alertaContext = useContext(AlertaContext);
    const { alerta,mostrarAlerta } = alertaContext;

    useEffect(() => {

        //si es qe hay algun error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    },[mensaje]);

    if(proyectos.lenght === 0 ) {
        return <p> No hay proyectos, agrega uno </p>
    }
    
    console.log(proyectos);

    return (
        <ul className="listado-proyecto">
            {alerta ? (<div className= {`alerta ${alerta.categoria}`} > {alerta.msg} </div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        
                        <Proyecto                            
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos;