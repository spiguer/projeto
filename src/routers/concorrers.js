const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Concorrer = require('../models/concorrer')
const {sendInscricaoEmail} = require('../emails/account')
const Curso = require('../models/curso')
const { isEmpty } = require('../utils/upload-helper')
const Concurso = require('../models/concurso')
const pdf = require('html-pdf')



router.get('/concorrer', (req, res) => {
    res.render('aluno/concorrer')
})


router.get('/tabela', (req, res) => {
    
    Concurso.find().then(concurso => {
        Curso.find().then(curso => {
            Concorrer.find().then(concorrers => {
                res.render('admin/tabela',{concurso, curso, concorrers})
            })
        })
    })
})


//Código para gerar PDF
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')


router.get('/pdf', async(request, response) => {

    

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/tabela', {
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

router.get('/tabela', (request, response) => {

    const filePath = path.join(__dirname, "./templates/views/admin/tabela.ejs")
    ejs.renderFile(filePath, { Concorrer }, (err, html) => {
        if(err) {
            return response.send('Erro na leitura do arquivo')
        }
    
        // enviar para o navegador
        return response.send(html)
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

    //Imagem CC
    if(!isEmpty(req.files)){
        let file = req.files.file;
        filename = Date.now() + '-' + file.name;

        let dirUploads = './public/images/'

        file.mv(dirUploads + filename, (err) => {
            if(err) throw err;
        })
        
    }
    //imagem Certificado habilitações
    if(!isEmpty(req.files)){
        let certificado = req.files.certificado;
        certiname = Date.now() + '-' + certificado.name;

        let dirUploads = './public/images/'

        certificado.mv(dirUploads + certiname, (err) => {
            if(err) throw err;
        })
        
    }


    try{
        const { name, email, contacto, dateOfBirth, nota, curso, concurso, file, certificado } = req.body
        const concorrer = new Concorrer ({ name, email, contacto, dateOfBirth, nota, curso, concurso, file: filename, certificado: certiname })
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