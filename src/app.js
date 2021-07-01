const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const LocalStrategy = require('passport-local')
require('./db/mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
const Admin = require('../src/models/admin')
const passport = require('passport')
const hbs = require('hbs')
const flash = require('connect-flash')
const session = require('express-session')

const adminRoutes = require('./routers/admin')
const cursosRoutes = require('./routers/cursos')
const concorrerRoutes = require('./routers/concorrers')
const concursoRoutes = require('./routers/concursos')


const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(publicDirectoryPath))
app.use(mongoSanitize({
    replaceWith: '_'
}))

const sessionConfig = {
    secret: 'iesfproject',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(helmet())
app.use(session(sessionConfig))
app.use(flash())



app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(Admin.authenticate()))

passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.admin
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})


//app.use(express.json())
app.use('/', adminRoutes)
app.use('/', cursosRoutes)
app.use('/', concursoRoutes)
app.use('/', concorrerRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/admin', (req, res) => {
    res.render('admin/admin')
})

/*app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})*/


app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
