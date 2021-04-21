//Titulares de Diploma de Técnico Superior Profissional

const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Alunostsp = require('../models/alunotsp')

router.get('/alunotsp', (req, res) => {
    res.render('aluno/alunotsp')
})

router.post('/alunostsp', catchAsync(async(req, res, next) => {
    try{
        const { name, email, contacto, dateOfBirth, cursoSuperior, notaFinal, curso } = req.body
        const alunotsp = new Alunostsp ({ name, email, contacto, dateOfBirth, cursoSuperior, notaFinal, curso })
        await alunotsp.save()
        res.redirect('/')
        
    }catch(e){
        req.flash('error', e.message)
        res.redirect('/')
    }
}))

module.exports = router