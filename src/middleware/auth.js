const jwt= require('jsonwebtoken')
const Admin = require('../models/admin')

const auth = async (req, res, next) => {
    try{
        const token= req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({_id: decoded._id, 'tokens.token': token})

        if(!admin){
            throw new Error()
        }

        req.token = token
        req.admin = admin
        next()

    }catch(e){
        res.status(401).send({ error: 'Por favor insira os dados de login!'})
    }
}

module.exports = auth