const Router = require('express').Router();
const inventoryController = require('../controllers/inventory')
const  {ensureAuth,ensureGuest } = require('../middleware/auth')



/// @route /inventory/????
Router.get('/',inventoryController.getInventory)
Router.post('/', inventoryController.addItem)
Router.delete('/', inventoryController.removePart)
Router.put('/update',inventoryController.updatePart)


module.exports = Router