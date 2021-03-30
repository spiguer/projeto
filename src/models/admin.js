const validator = require('validator')
const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Curso = require('./cursos')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
}, {
    timestamps: true
})

adminSchema.virtual('cursos', {
    ref:'Cursos',
    localField: '_id',
    foreignField: 'owner'
})

adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()

    delete adminObject.password
    delete adminObject.tokens
    delete adminObject.avatar

    return adminObject
}

adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign({ _id: admin._id.toString()}, process.env.JWT_SECRET)

    admin.tokens = admin.tokens.concat({ token: token })
    await admin.save()

    return token
}

adminSchema.statics.findByCredentials = async(email, password) => {
    const admin = await Admin.findOne({email: email})

    if(!email){
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return admin
}

adminSchema.pre('save', async function(next){
    const admin = this
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin