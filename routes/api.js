const Router = require('express').Router();
const inventoryController = require('../controllers/inventory')




/// @ROUTE /api/
Router.get('/',inventoryController.getInventoryApi)
// Router.post('/', inventoryController.addPart)
// Router.delete('/', inventoryController.removePart)
// Router.put('/update',inventoryController.updatePart)


module.exports = Router