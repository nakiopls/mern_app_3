import React,{Fragment} from 'react'
import Tarea from './Tarea'

const ListadoTareas = () => {

    const tareasProyecto = [
        {name: 'asd1', state:true},
        {name: 'asd2', state:false},
        {name: 'asd3', state:true},
        {name: 'asd4', state:false}
    ]

    return (
        <Fragment>
            <h2>Proyecto: asd1 </h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    
                    : tareasProyecto.map(tarea => (
                        <Tarea
                            tarea={tarea}
                        />
                    ))
                }
            </ul>
            <button
                type="button"
                className="btn btn-elimnar"
            >
            Eliminar Proyecto &times;
            </button>

        </Fragment>
    )
}

export default ListadoTareas
