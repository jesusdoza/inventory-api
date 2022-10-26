const passport = require('passport')
const User = require('../models/User')
const validator = require('validator')

module.exports.getLogin = (req,res)=>{
  console.log(req.user)
        if (req.user) { //if user is already authenticated
            return res.redirect('/inventory')
          }

        res.render('login.ejs')
}


module.exports.postLogin = (req,res,next)=>{

  console.log(`POST LOGIN*********************************************`)
  console.log(req.body)
   
  if(!req.body.password){
    console.log(`no password`)
    return res.redirect('/login')
  }

    passport.authenticate('local', (err, user, info) => {
      console.log(`post login user :`,user)
      console.log(`post login info :`, info)
    if (err) { return next(err) }
    if (!user) {
        console.log(`user not found`)
        return res.redirect('/login')
    }
    req.logIn(user, (err) => {
        if (err) { return next(err) }
        // req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/inventory')
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
          res.redirect('/login');
      })
      })
    
  } catch (error) {
    console.log(error)
    res.redirect('/login')
  }
    
}

module.exports.getSignup = (req,res)=>{
    if(req.user){
        return res.redirect('/inventory')
    }

    res.render('signup.ejs',{
        title: 'Create Account'
    })
}


module.exports.postSignup = (req,res)=>{

  try {
    console.log(req.body)
    ///adding user to database
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      console.log(`new user is: `,user)

      ///query database
      User.findOne({//!match either email or username
     
        username: req.body.username
      }, (err, existingUser) => { //! callback after findOne query (err, VAR_NAME)
        if (err) { throw new Error(`user look up error`) } //! error is truthy
        if (existingUser) { //! user already added so pick another
          console.log('user already exists: ',existingUser)///here problem registering
          throw new Error(`username in use`)
        }


        user.save((err) => { //! user passed up to this point and is valid to save to database

          if (err) { console.log(err); throw new Error(`user saving error`,err) }

          req.logIn(user, (err) => { //! log user in 
            if (err) {
               throw new Error(`login error`)
            }
            res.redirect('/inventory')
          })
        })

      })///end of findOne
  } catch (error) {

    console.log(error)
    res.status(500).json({message:error.message})
  }
   
}