const passport = require('passport')
const User = require('../models/User')
const validator = require('validator')

module.exports.getLogin = (req,res)=>{
        if (req.user) {
            return res.redirect('/')
          }

        res.render('login.ejs')
}


module.exports.postLogin = (req,res,next)=>{

  console.log(`POST LOGIN*********************************************`)
    // const validationErrors = []
    // if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })

    // if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    // if (validationErrors.length) {
    //     req.flash('errors', validationErrors)
    //     return res.redirect('/login')
    // }
  if(!req.body.password){
    console.log(`no password`)
    return res.redirect('/login')
  }

    // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
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
    req.logout()
    res.session.destroy((err)=>{
        if (err) console.log(`error: failed to destroy session during logout.`, err)
        
        req.user=null
        res.redirect('/');
    })
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
      console.log(user)

      ///query database
      User.findOne({//!match either email or username
     
        userName: req.body.username
      }, (err, existingUser) => { //! callback after findOne query (err, VAR_NAME)
        if (err) { throw new Error(`user look up error`) } //! error is truthy
        if (existingUser) { //! user already added so pick another
          throw new Error(`username in use`)
        }


        user.save((err) => { //! user passed up to this point and is valid to save to database

          if (err) {  throw new Error(`user saving error`) }

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