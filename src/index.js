const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const cursoRouter = require('./routers/cursos')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(adminRouter)
app.use(cursoRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
