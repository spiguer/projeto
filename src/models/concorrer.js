const mongoose = require('mongoose')
const Schema = mongoose.Schema

const concorrerSchema = new Schema({
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
        required: true,
        min: 910000000,
        max:969999999
    },
    dateOfBirth: {
        type: String,
        required: true,
        trim: true
    },
    nota: {
        type: Number,
        required: true,
        trim: true,
        min: 9.5,
        max: 20
    },
    curso: {
        type: String,
        required: true
    },
    concurso: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    certificado: {
        type: String
    }
})

module.exports = mongoose.model('Concorrer', concorrerSchema)