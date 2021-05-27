const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./models/database')
const Amigo = require('./models/Amigo')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/amigos', async (req, res) => {
    const amigos = await Amigo.find()
    res.json({success: true, respuesta: amigos})
})

app.post('/amigos', async (req, res) => {
    const { nombre, foto } = req.body
    const nuevoAmigo = new Amigo({nombre, foto})
    await nuevoAmigo.save()
    res.json({success: true, respuesta: nuevoAmigo})
})

const PORT = process.env.PORT
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => console.log(`App listening on port ${PORT}`))