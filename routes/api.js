const Router = require('express').Router();
const apiController = require('../controllers/apiController.js')
const  {ensureAuth,ensureGuest } = require('../middleware/auth')

const apiAuthController = require('../controllers/apiAuthController')




/// @route /api/*
Router.get('/',apiController.getInventory)
Router.post('/', apiController.addItem)
Router.delete('/', apiController.removePart)
Router.put('/update',apiController.updatePart)

Router.post('/login', apiAuthController.postLogin)
Router.get('/logout', apiAuthController.logout)


module.exports = Router