import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyecto/proyectoContext';

const NuevoProyecto = () => {

    //obteniendo state desde el context
    const proyectosContext = useContext(proyectoContext);
    const { form,errorform,mostrarFormulario,agregarProyecto, mostrarError } = proyectosContext;

    const[proyecto, setProyect] = useState ({
        nombre:'',
    })  

    const {nombre} = proyecto;

    const handleonChangeProyecto = e => {
        setProyect({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if(nombre === ''){
            mostrarError();
            return;
        }
        //add to state
        agregarProyecto(proyecto);
        //rr form
        setProyect({
            nombre:''
        })

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
                                name="nombre"
                                value={nombre}
                                onChange={handleonChangeProyecto}
                            />
                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="add proyect"

                            />
                        </form>
                    ) : null}

            { errorform ? <p className="mensaje error"> El nombre es obligatorio </p>   : null }
        </Fragment>
    )
}

export default NuevoProyecto;