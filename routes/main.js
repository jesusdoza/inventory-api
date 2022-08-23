const Router = require('express').Router()
const authController = require('../controllers/auth')



Router.get('/login', authController.getLogin)
Router.post('/login', authController.postLogin) //todo no controller enty yet
Router.get('/signup',authController.getSignup)
Router.post('/signup',authController.postSignup)
module.exports = Router