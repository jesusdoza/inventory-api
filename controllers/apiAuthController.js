
const passport = require('passport')
const User = require('../models/User')
const validator = require('validator')

module.exports.postLogin=(req,res,next)=>{

    console.log(`API POST LOGIN*********************************************`)
    console.log(req.body)
     
    if(!req.body.password){
      console.log(`no password`)
      return res.status(400).json({"login":"fail","message":"1"})
    }
  
      passport.authenticate('local', (err, user, info) => {
        // console.log(`post login user :`,user)
        // console.log(`post login info :`, info)
      if (err) { return next(err) }
      if (!user) {
          console.log(`user not found`)
          return res.json({"login":"fail","message":"2"})
      }
      req.logIn(user, (err) => {
          if (err) { return next(err) }
          console.log(`login user is `,user)
          return res.json({
            "login":"success",
            "user":{
              username:user.username,
              role: user.role,
              groups:user.groups
            }
          })
        
      })
      })(req, res, next)
          
}



module.exports.logout = (req,res)=>{
  console.log(`logout**************************************`)

  try {
      req.logout(()=>{
        req.session.destroy((err)=>{
          if (err) console.log(`error: failed to destroy session during logout.`, err)
          
          req.user=null
          return res.json({"logout":"success"})
      })
      })
    
  } catch (error) {
    console.log(error)
    return res.json({"logout":"failed"})
  }
    
}