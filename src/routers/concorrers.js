const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Concorrer = require('../models/concorrer')
const {sendInscricaoEmail} = require('../emails/account')
const Curso = require('../models/curso')

router.get('/concorrer', (req, res) => {
    res.render('aluno/concorrer')
})


router.get('/tabela', (req, res) =>{
    Curso.find({}, function(err, curso){
        if(err){
            console.log(err)
        }else{
            Concorrer.find({}, function(err, concorrers){
                if(err){
                    console.log(err)
                }else{
                    res.render('admin/tabela', {curso: curso, concorrers: concorrers})
                }
            })
        }
    })
})


router.post('/concorrer', catchAsync(async(req, res) => {
    try{
        const { name, email, contacto, dateOfBirth, nota, curso, tipoConc } = req.body
        const concorrer = new Concorrer ({ name, email, contacto, dateOfBirth, nota, curso, tipoConc })
        await concorrer.save()
        sendInscricaoEmail(concorrer.name, concorrer.email)
        req.flash('success', 'Inscrição feita com sucesso')
        res.redirect('/concorrer')
    }catch(e){
        req.flash('error', e.message)
        res.redirect('/concorrer')
    }
}))





module.exports = router