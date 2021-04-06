const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()
const Admin = require('../models/admin')
const auth = require('../middleware/auth')

router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body)
    try{
        await admin.save()
        //Adicionar email de boas vindas
        const token = await admin.generateAuthToken()
        res.status(201).send({admin, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/admin/login', async(req, res)=> {
    try{
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({admin: admin, token}).send(console.log('success'))
      
    }catch(e){
        res.status(400).send(console.log('failure'))
        

    }
})

router.post('/admin/logout', auth, async (req, res) => {
    try{    
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/admin/logoutAll', auth, async (req, res) => {
    try{
        req.admin.tokens = []
        await req.admin.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/admin/me', auth, async(req, res)=> {
    res.send(req.admin)
})

router.patch('/admin/me', auth, async(req, res)=> {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Alteração inválida'})
    }
    try{
        updates.forEach((update) => req.admin[update] = req.body[update])
        await req.admin.save()
        res.send(req.admin)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/admin/me', auth, async(req, res) => {
    try{   
        await req.admin.remove()
        //mandar email de cancelamento de conta
        res.send(req.admin)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router