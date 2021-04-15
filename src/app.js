const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const LocalStrategy = require('passport-local')
require('./db/mongoose')
const Admin = require('../src/models/admin')
const passport = require('passport')
const hbs = require('hbs')
//const flash = require('connect-flash')


const adminRoutes = require('./routers/admin')



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

app.use(helmet())


app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(Admin.authenticate()))

passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.admin
    //res.locals.success = req.flash('success')
    //res.locals.error = req.flash('error')
    next();
})


//app.use(express.json())
app.use('/', adminRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

/*app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})*/


app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
