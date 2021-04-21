//Titulares de Outros Cursos Superiores

const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Alunosoc = require('../models/alunooc')

router.get('/alunooc', (req, res) => {
    res.render('aluno/alunooc')
})

router.post('/alunosoc', catchAsync(async(req, res, next) => {
    try{
        const { name, email, contacto, dateOfBirth, cursoSuperior, nota, curso } = req.body
        const alunooc = new Alunosoc ({ name, email, contacto, dateOfBirth, cursoSuperior, nota, curso })
        await alunooc.save()
        res.redirect('/')
        
    }catch(e){
        req.flash('error', e.message)
        res.redirect('')
    }
}))

module.exports = router