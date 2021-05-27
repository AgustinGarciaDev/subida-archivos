const mongoose = require('mongoose')

const amigoSchema = new mongoose.Schema({
    nombre: String,
    foto: String
})

const Amigo = mongoose.model('amigo', amigoSchema)

module.exports = Amigo