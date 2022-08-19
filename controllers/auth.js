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

    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })

    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.redirect('/login')
    }

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
    }
    req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/todos')
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

    res.render('signup',{
        title: 'Create Account'
    })
}


module.exports.postSignup = (req,res)=>{
    const validationErrors = []
    // if(!validator.isEmail(req.body.email)) validationErrors.push({msg: 'Please enter a valid email address'})
    // if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

    
    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.redirect('/signup')
    }

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    ///adding user to database
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      })


      ///query database
      User.findOne({$or: [ //!match either email or username
        {email: req.body.email},
        {userName: req.body.userName}
      ]}, (err, existingUser) => { //! callback after findOne query (err, VAR_NAME)
        if (err) { return next(err) } //! error is truthy
        if (existingUser) { //! user already added so pick another
          req.flash('errors', { msg: 'Account with that email address or username already exists.' })
          return res.redirect('../signup')
        }


        user.save((err) => { //! user passed up to this point and is valid to save to database

          if (err) { return next(err) }

          req.logIn(user, (err) => { //! log user in 
            if (err) {
              return next(err)
            }
            res.redirect('/inventory')
          })
        })

      })///end of findOne
}