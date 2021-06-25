const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Curso = require('../models/curso')



router.get('/curso', (req, res) => {
    res.render('admin/curso')
})

router.get('/concorrer', (req, res) => {
    Curso.find({}, function(err, curso){
        res.render('aluno/concorrer', {curso: curso})
    })
})

router.get('/cursotable', (req, res) => {
    Curso.find().then(curso => {
        res.render('admin/cursotable', {curso: curso})
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