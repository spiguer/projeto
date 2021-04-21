//Titulares de diploma de especialização técnológica

const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Alunoset = require('../models/alunoet')

router.get('/alunoet', (req, res) => {
    res.render('aluno/alunoet')
})

router.post('/alunoset', catchAsync(async(req, res, next) => {
    try{
        const { name, email, contacto, dateOfBirth, diploma, nota, curso } = req.body
        const alunoet = new Alunoset ({ name, email, contacto, dateOfBirth, diploma, nota, curso })
        await alunoet.save()
        res.redirect('/')
        
    }catch(e){
        req.flash('error', e.message)
        res.redirect('')
    }
}))

module.exports = router