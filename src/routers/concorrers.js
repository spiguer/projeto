const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Concorrer = require('../models/concorrer')
const {sendInscricaoEmail} = require('../emails/account')
const Curso = require('../models/curso')
const bodyParser = require('body-parser')
const { db } = require('../models/concorrer')
const curso = require('../models/curso')


router.get('/concorrer', (req, res) => {
    res.render('aluno/concorrer')
})




/*router.get('/tabela', (req, res) => {
    Concorrer.find().then(concorrers => {
        res.render('admin/tabela', {concorrers: concorrers})
    })
})*/

router.get('/tabela', (req, res) => {
    Curso.find({
        order:[
            ['id', 'DESC']
        ]
    }).then(curso => {
        Concorrer.find().then(concorrers => {
            res.render('admin/tabela', {curso, concorrers})

        })
    })
})

router.post('/concorrers/delete', async(req, res) => {
    const _id = req.body.id

    Concorrer.findByIdAndDelete({_id}, function(err, concorrers){
        req.flash('success', 'Concorrente eliminado com sucesso')
        res.redirect('../tabela')
    })
})






/*
O que estava antes na tabela.ejs
router.get('/tabela', (req, res) =>{
    Curso.find({}, function(err, curso){
       if(err){
           console.log(err)
       }else{
           
           Concorrer.find({}, function(err, concorrers){
               if(err){
                   console.log(err)
               }else{
                   res.render('admin/tabela', {curso, concorrers})
               }
           })
       }
   })
})*/

/*<tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Contacto</th>
                                <th>Data de Nascimento</th>
                                <th>Nota</th>
                                <th>Curso</th>
                                <th>Tipo de Concurso</th>
                            </tr>
                           
                            <% for(var i=0; i<concorrers.length; i++) {%>
                                <tr>
                                    <td><%= concorrers[i].name %></td>
                                    <td><%= concorrers[i].email %></td>
                                    <td><%= concorrers[i].contacto %></td>
                                    <td><%= concorrers[i].dateOfBirth %></td>
                                    <td><%= concorrers[i].nota %></td>
                                    <td><%= concorrers[i].curso %></td>
                                    <td><%= concorrers[i].tipoConc %></td>
                                </tr>
                            <% } %>




<form method="GET" action="/tabela">
                            <select>
                                <% curso.forEach(function(curso){ %>
                                    <option value="<%= curso.name %>"><%= curso.name %> </option>
                                <% }) %>
                                
                            </select>
                            <br><br>

                            

                            <br><br>
                            <button class="btn btn-success btn-block" href="/tabela<%= concorrers.curso %>" type="submit">Ver Curso</button>
                            */






router.post('/concorrer', catchAsync(async(req, res) => {
    try{
        const { name, email, contacto, dateOfBirth, nota, curso, tipoConc } = req.body
        const concorrer = new Concorrer ({ name, email, contacto, dateOfBirth, nota, curso, tipoConc })
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