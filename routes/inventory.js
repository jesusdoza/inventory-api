const Router = require('express').Router();
const inventoryController = require('../controllers/inventory')



/// @route /inventory/????
Router.get('/',inventoryController.getInventory)
Router.post('/', inventoryController.addPart)
Router.delete('/', inventoryController.removePart)
Router.put('/update',inventoryController.updatePart)


module.exports = Router