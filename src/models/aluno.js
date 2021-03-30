const mongoose = require('mongoose');
const validator = require('validator')

const alunoSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Nome inválido!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email inválido!')
            }
        }
    },
    age: {
        type: Number,
        default: 23,
        validate(value) {
            if (value < 23) {
                throw new Error('Idade tem de ser superior a 23 anos!')
            }
        }
    },
    tymestamps: true
})