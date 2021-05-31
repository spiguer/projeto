const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Concorrer = require('../models/concorrer')
const {sendInscricaoEmail} = require('../emails/account')

router.get('/concorrer', (req, res) => {
    res.render('aluno/concorrer')
})




router.post('/concorrer', catchAsync(async(req, res, next) => {
    try{
        const { name, email, contacto, dateOfBirth, nota, curso, tipoConc } = req.body
        const concorrer = new Concorrer ({ name, email, contacto, dateOfBirth, nota, curso, tipoConc })
        await concorrer.save()
        sendInscricaoEmail(concorrer.name, concorrer.email, concorrer.curso, concorrer.nota)
        res.redirect('/')

        
        
    }catch(e){
        req.flash('error', e.message)
        res.redirect('')
    }
}))

module.exports = router