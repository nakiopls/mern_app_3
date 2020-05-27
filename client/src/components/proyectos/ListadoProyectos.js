import React, {useContext,useEffect} from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyecto/proyectoContext';


const ListadoProyectos = () => {

    //Obtener estados desde el context
    const proyectosContext = useContext(proyectoContext);
    const { proyects,obtenerProyectos } = proyectosContext;    

    useEffect(() => {
        obtenerProyectos();
    },[]);

    if(proyects.lenght === 0 ) return null;

    return (
        <ul className="listado-proyecto">
            {proyects.map(proyecto => (
                <Proyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                />
            ))}
        </ul>
    )
}

export default ListadoProyectos;