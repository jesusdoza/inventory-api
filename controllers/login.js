const User = require('../models/User')

module.exports.getLogin = (req,res)=>{
    res.render('login.ejs')
}

module.exports.postLogin = (req,res)=>{
    try {
        if(req.password !== req.cofirmpassword){
            throw new Error('passwords do not match')
        }
        
        
        const newUser = {
            username : req.username,
            password:req.username,
        }

        
    } catch (error) {
        res.status(505).json({"error creating user":error})
    }
    
    
}