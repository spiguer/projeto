const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const cursoRouter = require('./routers/cursos')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Teste'
    })
})

app.get('/admin/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
    
})



app.use(express.json())
app.use(adminRouter)
app.use(cursoRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
