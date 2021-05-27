import React, { useEffect, useState } from 'react'
import {API} from './API'

const Amigos = (props) => {
    const [amigos, setAmigos] = useState([])

    useEffect(() => {
        fetch(`${API}/amigos`)
        .then(res => res.json())
        .then(data => {
            setAmigos(data.respuesta)
        })
    }, [props.reload])

    const sinAmigos = <h1>No tenés amigos todavía...</h1>

    return (
        <div className="subContenedor">
            <h1>Amigos Actuales</h1>
            <div className="cajaAmigos">
                {!amigos.length ? sinAmigos
                 : amigos.map(amigo => {
                     const fotito = require("."+amigo.foto)
                    return <div key={amigo.nombre} className="amigo">
                        <div className="foto" style={{backgroundImage: `url(${fotito.default})`}}></div>
                        <h1>{amigo.nombre}</h1>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Amigos
