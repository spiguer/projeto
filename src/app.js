const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const ejs = require('ejs')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const cursoRouter = require('./routers/cursos')




const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'ejs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use('/admin', adminRouter)
app.use(cursoRouter)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
