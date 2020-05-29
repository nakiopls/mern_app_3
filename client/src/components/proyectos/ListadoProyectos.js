import React, {useContext,useEffect} from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyecto/proyectoContext';

import {TransitionGroup, CSSTransition} from 'react-transition-group'


const ListadoProyectos = () => {

    //Obtener estados desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyects,obtenerProyectos } = proyectosContext;    

    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    },[]);

    if(proyects.lenght === 0 ) {
        return <p> No hay proyectos, agrega uno </p>
    }
    
    return (
        <ul className="listado-proyecto">
            <TransitionGroup>
                {proyects.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
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