const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cursoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    escola: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Curso', cursoSchema)