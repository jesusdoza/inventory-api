const User = require('../models/User')

module.exports.getLogin = (req,res)=>{
    res.render('login.ejs')
}

module.exports.postLogin = (req,res)=>{
    try {
        // if(req.password !== req.cofirmPassword){
        //     throw new Error('passwords do not match')
        // }
        
        console.log(req.body)
        const newUser = {
            username : req.username,
            password:req.password,
        }     

        console.log(newUser)
    } catch (error) {
        res.status(505).json({"error creating user":error})
    }  
}

module.exports.getSignup = (req,res)=>{
    console.log(`auth signup`)
    res.render('signup.ejs')
}

module.exports.postSignup =async (req,res)=>{
    try {
        //!console.log(req.body)
        if(req.body.password !== req.body.confirmPassword){
            throw new Error('passwords do not match')
        }
        // else{
        //     console.log(`passwords match`,req.body)
        // }
 
        const newUser = {
            username : req.body.username,
            password:req.body.password,
        }  
        
        const foundUser = await User.findOne({userId:req.body.username})
        
        //! console.log('found user is :',foundUser)
        if(foundUser){
            // console.log(`user already in use`)
            throw new Error(`user already exists`)
        }

        const result = User.create



    } catch (error) {
        
        res.status(505).json({"error creating user":error.message})
    }  
}