const Router = require('express').Router();
const inventoryController = require('../controllers/inventory')



/// @route /inventory
Router.get('/',inventoryController.getInventory)


module.exports = Router