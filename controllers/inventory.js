const Parts = require("../models/Part");


module.exports.getInventory = async (req,res)=>{

    try {
        const allInventory = await Parts.find();

        res.render('index.ejs',{inventory:allInventory})

    } catch (error) {
        console.log(`error getting inventory`,error)
        res.status(500).json({"message":"error getting inventory"})
    }
    
}