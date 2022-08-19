const { Router } = require('express');
const inventoryController = require('../controllers/inventory')



/// @route /inventory
Router.get('/',inventoryController.getInventory)


module.exports = Router