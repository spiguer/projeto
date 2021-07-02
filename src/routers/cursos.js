const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Curso = require('../models/curso')
const Concorrer = require('../models/concorrer')
const Concurso = require('../models/concurso')



router.get('/curso', (req, res) => {
    res.render('admin/curso')
})

router.get('/concorrer', (req, res) => {
    Concurso.find({}, function(err, concurso){
        Curso.find({}, function(err, curso){
            res.render('aluno/concorrer', {curso: curso, concurso})
        })
    })

    
})



router.get('/cursotable', (req, res) => {
    Concurso.find().then(concurso => {
        Concorrer.find().then(concorrers => {
            Curso.find().then(curso => {
                res.render('admin/cursotable', {curso, concorrers, concurso})
            })
        })
    })
    
    
})


router.get('/showalunos', async (req, res) => {
    Concorrer.find({curso: req.query.curso, concurso: req.query.concurso}).then(concorrers => {
    res.render('admin/showalunos', {concorrers})     
    })
        
})




router.post('/cursos', catchAsync(async(req, res, next) => {
    try{
        const {name, vagaset, vagasoc, vagastsp, vagasvt} = req.body
        const curs = new Curso ({name, vagaset, vagasoc, vagastsp, vagasvt})
        await curs.save()
        res.redirect('admin')
    }catch(e){
        req.flash('error', e.message)
        res.redirect('admin/curso')
    }
    
}))


router.post('/cursos/delete', async(req, res) => {
    const _id = req.body.id

    Curso.findByIdAndDelete({_id}, function( err, curso){
        req.flash('success', 'Curso eliminado com sucesso')
        res.redirect('../cursotable')
    })
})

module.exports = router