import React, { useState } from 'react'
import Amigos from './Amigos'
import './App.css'
import Formulario from './Formulario'

const App = () => {
  const [reload, setReload] = useState(false)

  return (
    <div className="contenedor">
      <Formulario setReload={setReload} reload={reload} />
      <Amigos reload={reload} />
    </div>
  )
}

export default App

