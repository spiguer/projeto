const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Curso = require('../models/curso')


router.get('/curso', (req, res) => {
    res.render('admin/curso')
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

module.exports = router