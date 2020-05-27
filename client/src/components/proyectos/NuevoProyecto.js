import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyecto/proyectoContext';

const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext);
    const { form,mostrarFormulario } = proyectosContext;

    const[proyect, setProyect] = useState ({
        name:''
    })  

    const {name} = proyect;

    const handleonChangeProyecto = e => {
        setProyect({
            ...proyect,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar


    }

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >
            Nuevo Proyecto
            </button>

            {
                form    ? 
                    ( 
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmit}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="name"
                                value={name}
                                onChange={handleonChangeProyecto}
                            />
                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="add proyect"

                            />
                        </form>
                    ) : null
            }
        </Fragment>
    )
}

export default NuevoProyecto;