const mongoose = require('mongoose')
const validator = require('validator')

const cursoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    }, 
    vagas: {
        type: Number,
        required: true
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
        //Já instalei data-picker, ver como funciona e ligar ao template
        
    }
}, {
    timestamps: true
})

const Curso = mongoose.model('Cursos', cursoSchema)

module.exports = Curso