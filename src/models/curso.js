const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cursoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    vagaset: {
        type: Number,
        required: true,
        default: 0
    },
    vagasoc: {
        type: Number,
        required: true,
        default: 0
    },
    vagastsp: {
        type: Number,
        required: true,
        default: 0
    },
    vagasvt: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Curso', cursoSchema)