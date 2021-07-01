const mongoose = require('mongoose')
const Schema = mongoose.Schema

const concursoSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Concurso', concursoSchema)