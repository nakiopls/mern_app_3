import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'


const Login = (props) => {
        
    //extraer valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta,mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //En el caso qe el password o usuario no exista
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria) ;
        }
        // eslint-disable-next-line
    },[mensaje,autenticado, props.history]);

    const [user,setUser] = useState({
        email:'',
        password:''
    });

    const {email,password} = user;

    const handleonChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //validar campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error')
        }

        //pasarlo al action
        iniciarSesion({email,password});
    }

    return (
        <div>
        <div>
        {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
        </div>
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

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
                    <div>
                        <div className="campo-form">
                            <input type="submit" className="btn btn-primario btn-block"
                            value="Inicar Sesión"/>
                        </div>
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>

            </div>
        </div>
        </div>
    )
}

export default Login;