const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./models/database')
const Amigo = require('./models/Amigo')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())

app.use(express.static('fotos'))

app.get('/amigos', async (req, res) => {
    const amigos = await Amigo.find()
    res.json({success: true, respuesta: amigos})
})

app.post('/amigos', async (req, res) => {
   const {nombre} = req.body
   const {foto} = req.files

   const nuevoAmigo = new Amigo({nombre})
   const {_id} = nuevoAmigo

   const fileName = _id + "." + foto.name.split(".")[foto.name.split(".").length-1]
   const ruta = `${__dirname}/client/build/fotos/${fileName}`   

   nuevoAmigo.foto = '/fotos/' + fileName
   await nuevoAmigo.save()

   foto.mv(ruta, err => {
       console.log(err)
       if (err) {
           return res.json({success: false, respuesta: "Hubo un error al grabar el archivo"})
       }
       res.json({success: true})
   })
   
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })
}

const PORT = process.env.PORT
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => console.log(`App listening on port ${PORT}`))