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


router.get('/showalunos', (req, res) => {
    Concorrer.find({curso: req.body.curso, concurso: req.body.concurso}).then(concorrers => {
    res.render('admin/showalunos', {concorrers})     
    })
        
})


//PDF
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')


router.get('/pdff', async(request, response) => {

    

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/showalunos', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'A2'
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)

})

router.get('/showalunos?', (request, response) => {

    const filePath = path.join(__dirname, "./templates/views/admin/showalunos.ejs")
    ejs.renderFile(filePath, { Concorrer }, (err, html) => {
        if(err) {
            return response.send('Erro na leitura do arquivo')
        }
    
        // enviar para o navegador
        return response.send(html)
    })
   
})






router.post('/cursos', catchAsync(async(req, res, next) => {
    try{
        const {name, escola} = req.body
        const curs = new Curso ({name, escola})
        await curs.save()
        res.redirect('cursotable')
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