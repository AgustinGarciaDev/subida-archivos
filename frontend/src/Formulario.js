import React, { useState } from 'react'
import axios from 'axios'
import {API} from './API'

const Formulario = (props) => {

    const [nuevoAmigo, setNuevoAmigo] = useState({nombre: ''})
    const [fotoAmigo, setFotoAmigo] = useState({foto: ''})
    
    const leerInput = (e) => {
        const valor = e.target.value
        const campo = e.target.name
        setNuevoAmigo({
            ...nuevoAmigo,
            [campo]: valor
        })
    }

    const cargarFoto = e => {
        setFotoAmigo({foto: e.target.files[0]})
    }

    const enviarAmigo = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nombre', nuevoAmigo.nombre)
        formData.append('foto', fotoAmigo.foto)
        await axios.post(`${API}/amigos`, formData)
        props.setReload(!props.reload)
        setNuevoAmigo({nombre: '', foto: ''})
    }
    return (
        <div className="subContenedor">
            <h1>Cargar un Nuevo Amigo</h1>
            <form onSubmit={enviarAmigo}>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre del amigo"
                onChange={leerInput} value={nuevoAmigo.nombre} />
                <input type="file" name="foto" id="foto" onChange={cargarFoto} />
                <input type="submit" value="Enviar Amigo" />
            </form>
        </div>
    )
}

export default Formulario
