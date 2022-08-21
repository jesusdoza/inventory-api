const { response } = require("express");
const Parts = require("../models/Part");


module.exports.getInventory = async (req,res)=>{

    try {
        const allInventory = await Parts.find();

        res.render('inventory.ejs',{inventory:allInventory})

    } catch (error) {
        console.log(`error getting inventory`,error)
        res.status(500).json({"message":"error getting inventory"})
    }
    
}


module.exports.addPart = async (req,res)=>{
    console.log(req.body)
    try {
        const newPart  = await Parts.create({
            partnumber:req.body.part,
            model:req.body.model,
            enginemake:req.body.engien_make,
            instock:req.body.quantity,
            // cores:,
            // warranty:,
            // problem:,
        })

        res.redirect('/inventory')
    } catch (error) {
        console.log(`error adding to inventory`,error)
        res.status(400).json({"message":"error getting inventory"})
    }
    
}



module.exports.removePart = async (req,res)=>{
    console.log(`remove part`)
    try {
                //find specific entry
                const foundPart = await Parts.findOne(
                    //query
                    {      
                        partnumber : req.body.partnumber
                        
                    }
                )

                if(!foundPart){ res.status(400).json({message:"part not found"})}
                
                console.log(`found part is `,foundPart)

                const result = await Parts.deleteOne({_id:foundPart._id})
            
                 console.log(result)
                res.redirect('/')
                
            } 
            catch (error) {
                console.log('error at delete',error)
                
                res.status(505).json({message:"error deleting"});
              
            }
    
}
