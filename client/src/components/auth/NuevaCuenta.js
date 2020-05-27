import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const NuevaCuenta = () => {

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

        //password min 6 caract

        //password iguales
    }

    return (
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
    )
}

export default NuevaCuenta;