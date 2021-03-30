const express = require('express')
const auth = require('../middleware/auth')
const Curso = require('../models/cursos')
const router = new express.Router()
const Cursos = require('../models/cursos')

router.get('/cursos', auth, async(req, res) => {
    const match = {}
    const sort = {}

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1

    }
    try{
        await req.admin.populate({
            path: 'cursos',
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        }).executePopulate()

        res.send(req.admin.cursos)

    }catch(e){
        res.status(500).send()
    }
})

router.get('cursos/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        const curso = await Cursos.findOne({ _id, owner: req.admin._id})

        if(!curso){
            return res.status(404).send()
        }
        res.send(curso)
    }catch(e) {
        res.status(500).send()
    }
})

router.post('/cursos', auth, async (req, res) =>{
    const curso = new Cursos({
        ...req.body,
        owner: req.admin._id
    })
    try{
        await cursos.save()
        res.status(201).send(curso)
    }catch(e){
        res.status(400).send(e)
    }

})

router.patch('cursos/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['nome', 'vagas', 'escola', 'dataLimite']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Operação inválida'})

    }
    try{
        const curso = await Cursos.findOne({_id: req.params.id, owner :req.admin._id})

        if(!curso){
            return res.status(404).send()
        }
        updates.forEach((update) => curso[update] = req.body[update])
        await curso.save()
        res.send(curso)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/cursos/:id', auth, async(req, res) =>{
    try{
        const curso = await Cursos.findByIdAndDelete({_id: req.params.id, owner: req.user._id})

        if(!curso){
            return res.status(404).send()
        }
        res.send(curso)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
