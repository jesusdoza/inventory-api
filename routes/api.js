const Router = require('express').Router();
const apiController = require('../controllers/apiController.js')
const  {ensureAuth,ensureGuest } = require('../middleware/auth')




/// @route /api/*
Router.get('/',apiController.getInventory)
Router.post('/', apiController.addItem)
Router.delete('/', apiController.removePart)
Router.put('/update',apiController.updatePart)


module.exports = Router