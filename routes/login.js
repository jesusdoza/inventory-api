const Router = require('express').Router()
const loginController = require('../controllers/login')



Router.get('/', loginController.getLogin)

module.exports = Router