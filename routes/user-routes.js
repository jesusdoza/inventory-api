// packages
const express = require('express')
const router = express.Router()
const User = require('../models/User')

const passport = require('passport')
const LocalStrategy = require('passport-local');
require('../config/passport')(passport)



//routes
// @route user/register
router.get('/register',async (request,response)=>{

   
    response.render('register.ejs')

})



// router.post('/register',async (request,response)=>{
//     console.log('post for user register')
//     let password = request.body.password;
//     const username= request.body.username;

//     console.log(request.body)
//     const salt = await crypto.randomBytes(256).toString('hex')
    

//     //hash password
//     crypto.pbkdf2(password, salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
//       try {
//             const newUser ={
//                 userId:username,
//                 password:hashedPassword,
//                 salt:salt,
//             }
            
           

//             //query database for user
//             const foundUser = await User.findOne({userId: username})
            
//             //if no user found register name
//             if(!foundUser){
//                 console.log(`new user created`)
//                 // insert user
//                 const result = await User.create(newUser)
//                 response.json({message:'register successfull'})
//             }else{
//                 response.redirect('/user/register')
//             }
        
//       } catch (error) {
//         console.log(`error registering`, error)
       
//       }
       




//     })



// })

//// gooof below
// router.post('/register',async (request,response)=>{
//     console.log('post for user register')
//     let password = request.body.password;
//     const username= request.body.username;

//     console.log(request.body)
//     const salt = await crypto.randomBytes(256).toString('hex')
    

//     //hash password
//     crypto.pbkdf2(password, salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
//       try {
//             const newUser ={
//                 userId:username,
//                 password:hashedPassword,
//                 salt:salt,
//             }
            
           
//             const result = await User.create(newUser)

//             //query database for user
//             const foundUser = await User.findOne({userId: username})
            
//             if(crypto.timingSafeEqual(foundUser.password, hashedPassword)){
//                 console.log(`passwords match!!!!!!!!`)
//                 console.log('databasse user:',foundUser);
//                 console.log('new user data:',newUser)
            
//             }else{
//                 console.log(`passwords DONOT match!!!!!!!!`)
//                 console.log('databasse user:',foundUser);
//                 console.log('new user data:',newUser)
//             }

        
//       } catch (error) {
//         console.log(`error registering`, error)
       
//       }
//     })
// })
/////gooooof


//@ route /user/login
router.get('/login',async (request,response)=>{

    response.render('login.ejs')

})


//todo move the passport authenticate middlware here

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));



// router.post('/user/login',async (request,response)=>{


//      try {
//             const newUser ={
//                 userId:username,
//                 password:hashedPassword,
//                 salt:salt,
//             }
            

//             const result = await User.create(newUser)

            
//             //query database for user
//             const foundUser = await User.findOne({userId: username})
//             console.log('databasse user:',foundUser);
                
//             //!if no user found
//             if(!foundUser){console.log(`user not found in database`)}


//             //! if password does not match
//             if(!crypto.timingSafeEqual(foundUser.password, hashedPassword)){
//                 console.log(`passwords does not match!!!!!!!!`)
//                 // console.log('databasse user:',foundUser);
//                 // console.log('new user data:',newUser)
            
//             }else{
//                 console.log(`passwords match`)
//                 // console.log('databasse user:',foundUser);
//                 // console.log('new user data:',newUser)

//                 response.json({message:'login successfull'})
//             }
        
//       } catch (error) {
//         console.log(`error registering`, error)
       
//       }
       




// })




module.exports = router;

