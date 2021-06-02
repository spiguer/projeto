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
        type: Date,
        required: true,
        trim: true
    },
    nota: {
        type: Number,
        required: true,
        trim: true,
        min: 10,
        max: 20
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