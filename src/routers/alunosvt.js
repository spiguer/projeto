//Maiores de 23 anos
const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Alunosvt = require('../models/alunovt')

router.get('/alunosvt', (req, res) => {
    res.render('aluno/alunovt')
})

router.get('/tabelavp', (req, res) => {
    Alunosvt.find({}, function(err, alunosvt){
        res.render('admin/tabelavp', {alunosvt: alunosvt})
    })
})


router.post('/alunosvt', catchAsync(async(req, res, next) => {
    try{
        const { name, email, contacto, dateOfBirth, nota, curso } = req.body
        const alunovt = new Alunosvt ({ name, email, contacto, dateOfBirth, nota, curso })
        await alunovt.save()
        res.redirect('/')
        
    }catch(e){
        req.flash('error', e.message)
        res.redirect('')
    }
}))

module.exports = router