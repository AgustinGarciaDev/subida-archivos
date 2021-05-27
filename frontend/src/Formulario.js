import React, { useState } from 'react'
import axios from 'axios'

const Formulario = (props) => {

    const [nuevoAmigo, setNuevoAmigo] = useState({nombre: '', foto: ''})
    
    const leerInput = (e) => {
        const valor = e.target.value
        const campo = e.target.name
        setNuevoAmigo({
            ...nuevoAmigo,
            [campo]: valor
        })
    }

    const enviarAmigo = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:4000/amigos', nuevoAmigo)
        props.setReload(!props.reload)
        setNuevoAmigo({nombre: '', foto: ''})
    }
    return (
        <div className="subContenedor">
            <h1>Cargar un Nuevo Amigo</h1>
            <form onSubmit={enviarAmigo}>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre del amigo"
                onChange={leerInput} value={nuevoAmigo.nombre} />
                <input type="text" name="foto" id="foto" placeholder="Foto del amigo" 
                onChange={leerInput} value={nuevoAmigo.foto} />
                <input type="submit" value="Enviar Amigo" />
            </form>
        </div>
    )
}

export default Formulario
