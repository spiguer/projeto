const mongoose = require('mongoose')
const validator = require('validator')

const cursoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    }, 
    vagas: {
        type: Int,
        default: 10
        //Colocar aqui erro para vagas < 0
    },
    escola:{
        type:String, 
        required: true,
        trim: true
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Admin'
    },
    dataLimite: {
        //ver como inserir data em vez de int
        type: Int,
        required: true
    }
}, {
    timestamps: true
})

const Curso = mongoose.model('Cursos', cursoSchema)

module.exports = Curso