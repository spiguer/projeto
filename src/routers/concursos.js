const express = require('express')
const router = express.Router()
const Concurso = require('../models/concurso')

router.get('/concurso', (req, res) => {
    res.render('admin/concurso')
})

router.get('/concursotable', (req, res) => {
    Concurso.find().then(concurso =>{
        res.render('admin/concursotable', {concurso})
    })
})



router.post('/concursos', async(req, res) => {
    try{
        const {name} = req.body
        const concurs = new Concurso({name})
        await concurs.save()
        res.redirect('/curso')
     }catch(e){
        req.flash('error', e.message)
        res.redirect('admin/concurso')
    }
})

router.post('/concursos/delete', async(req, res) => {
    const _id = req.body.id

    Concurso.findByIdAndDelete({_id}, function(err, concurso){
        req.flash('success', 'Tipo de Concurso eliminado com sucesso')
        res.redirect('../concursotable')
    })
})

module.exports = router