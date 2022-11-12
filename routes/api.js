const Router = require('express').Router();
const apiController = require('../controllers/apiController.js')
const  {ensureAuth,ensureGuest } = require('../middleware/auth')

const apiAuthController = require('../controllers/apiAuthController')




/// @route /api/*
Router.get('/',ensureAuth,apiController.getInventory)
Router.post('/',ensureAuth, apiController.addItem)
Router.delete('/',ensureAuth, apiController.removePart)
Router.put('/update',ensureAuth,apiController.updatePart)

Router.post('/login', apiAuthController.postLogin)
Router.get('/logout', apiAuthController.logout)


module.exports = Router