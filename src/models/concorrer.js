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
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    nota: {
        type: Number,
        required: true,
        trim: true
    },
    curso: {
        type: String,
        required: true
    },
    tipoConc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Concorrer', concorrerSchema)