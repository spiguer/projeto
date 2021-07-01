const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Concorrer = require('../models/concorrer')
const {sendInscricaoEmail} = require('../emails/account')
const Curso = require('../models/curso')


router.get('/concorrer', (req, res) => {
    res.render('aluno/concorrer')
})


router.get('/tabela', (req, res) => {
    Curso.find({
        order:[
            ['id', 'DESC']
        ]
    }).then(curso => {
        Concorrer.find().then(concorrers => {
            res.render('admin/tabela', {curso, concorrers})

        })
    })
})

router.post('/concorrers/delete', async(req, res) => {
    const _id = req.body.id

    Concorrer.findByIdAndDelete({_id}, function(err, concorrers){
        req.flash('success', 'Concorrente eliminado com sucesso')
        res.redirect('../tabela')
    })
})


router.post('/concorrer', catchAsync(async(req, res) => {
    try{
        const { name, email, contacto, dateOfBirth, nota, curso, concurso } = req.body
        const concorrer = new Concorrer ({ name, email, contacto, dateOfBirth, nota, curso, concurso })
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