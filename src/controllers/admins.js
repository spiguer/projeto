const Admin = require('../models/admin')

module.exports.renderRegister = (req, res) => {
    res.render('admin/registar')
}

module.exports.register = async (req, res, next) => {
    try{
        const {email, username, password} = req.body
        const admin = new Admin({email, password})
        const registarAdmin = await Admin.register(admin, password)
        req.login(registarAdmin, err => {
            if(err) return next(err)
            req.flash('success', 'Bem vindo')
            //Criar res.redirect('')
        })
    }catch(e){
        req.flash('error', e.message)
        res.redirect('registar')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('admin/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Bem vindo de volta!')
    const redirectUrl = req.session.returnTo || //pagina a criar'/'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout()
    req.flass('success', 'Até á próxima')
    res.redirect('/index')
}