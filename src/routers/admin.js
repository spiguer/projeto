const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const Admin = require('../models/admin')
const admins = require('../controllers/admins')

router.route('/registar')
    .get(admins.renderRegister)
    .post(catchAsync(admins.register))

router.route('/login')
    .get(admins.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), admins.login)

router.get('/logout', admins.logout)

module.exports = router