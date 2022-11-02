const Router = require('express').Router();
const reactController = require('../controllers/reactController.js')
const  {ensureAuth,ensureGuest } = require('../middleware/auth')




/// @route /api/*
Router.get('/',reactController.getPage)
// Router.post('/', reactController.addItem)
// Router.delete('/', reactController.removePart)
// Router.put('/update',reactController.updatePart)


module.exports = Router