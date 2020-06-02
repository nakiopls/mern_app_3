import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    //extraer valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta,mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //en caso que se autentique, registre o un registro duplicado
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria) ;
        }

    },[mensaje,autenticado, props.history]);

    if (alerta) {
        console.log(alerta.categoria);
    }

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password_repeat:''
    });

    const {name,email,password,password_repeat} = user;

    const handleonChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //validar
        if ( name.trim()           === '' || 
            email.trim()           === '' || 
            password.trim()        === '' || 
            password_repeat.trim() === '' )
            {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error') ;
                return;
            }

        //password min 6 caract
        if(password.length < 6 ) {
            mostrarAlerta('El password debe ser al menos de 6 caracteres', 'alerta-error');
            return;
        }

        //password iguales
        if (password !== password_repeat) {
            mostrarAlerta('Las passwords no son iguales', 'alerta-error');
        }

        //pasar al action
        registrarUsuario({
            name,
            email,
            password
        })
    }

    return (
        <div>
        <div>
        {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
        </div>
        <div className="form-usuario">            
            <div className="contenedor-form sombra-dark">
                <h1>Obtener Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >   
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingrese email"
                            value={email}
                            onChange={handleonChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ingrese Nombre "
                            value={name}
                            onChange={handleonChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrese Password"
                            value={password}
                            onChange={handleonChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input
                            type="password"
                            id="password"
                            name="password_repeat"
                            placeholder="Ingrese Password nuevamente"
                            value={password_repeat}
                            onChange={handleonChange}
                        />
                    </div>
                    <div>
                        <div className="campo-form">
                            <input type="submit" className="btn btn-primario btn-block"
                            value="Registrar cuenta"/>
                        </div>
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver al lobby
                </Link>

            </div>
        </div>

        </div>
    )
}

export default NuevaCuenta;