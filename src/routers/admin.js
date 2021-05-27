const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const Admin = require('../models/admin')

router.get('/registar', (req, res)=>{
    res.render('admin/registar')
})

router.post('/admins', catchAsync(async(req, res, next) => {
    try{
        const { email, username, password} = req.body
        const admin = new Admin({ email, username})
        const registerAdmin = await Admin.register(admin, password)
        req.login(registerAdmin, err =>{
            if(err) return next(err)
            req.flash('success', 'Bem vindo')
            res.redirect('/admin')
        })
    }catch(e){
        req.flash('error', e.message)
        res.redirect('')
    }
}))

router.get('/login', (req, res) => {
    res.render('admin/login')
})

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect: '/login'}), (req, res)=>{
    console.log('Sucesso')
    req.flash('success', 'Bem vindo de volta')
    const redirectUrl = req.session.returnTo || '/'
    delete req.session.returnTo
    res.redirect('/tabelavp')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})



router.get('/escolha', (req, res) => {
    res.render('aluno/escolha')
})

module.exports = router