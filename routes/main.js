const Router = require('express').Router()
const authController = require('../controllers/auth')
const apiAuthController = require('../controllers/apiAuthController')


Router.get('/', authController.getLogin)
Router.get('/login', authController.getLogin)

Router.post('/login', authController.postLogin) 
Router.get('/signup',authController.getSignup)
Router.post('/signup',authController.postSignup)
Router.get('/logout',authController.logout)

///api login
Router.post('/login/api', apiAuthController.postLogin)

module.exports = Router