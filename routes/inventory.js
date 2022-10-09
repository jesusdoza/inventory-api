const Router = require('express').Router();
const inventoryController = require('../controllers/inventory')
const  {ensureAuth,ensureGuest } = require('../middleware/auth')



/// @route /inventory/????
Router.get('/',inventoryController.getInventory)
Router.get('/react',inventoryController.getInventoryreact)
Router.post('/', inventoryController.addPart)
Router.delete('/', inventoryController.removePart)
Router.put('/update',inventoryController.updatePart)


module.exports = Router