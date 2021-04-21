//Titulares de Outros Cursos Superiores

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alunoocSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    contacto: {
        type: Number,
        trim: true, 
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    cursoSuperior: {
        type:String,
        required: true
    },
    nota: {
        type: Number,
        required: true,
        trim: true
    },
    curso: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('Alunosoc', alunoocSchema)