
//specify strategy to use with passport
const LocalStrategy  = require('passport-local')

const crypto = require('crypto');
//user database
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = async (passport)=>{
    passport.use(new LocalStrategy(async function verify(username, password, cb) {
      const salt = await crypto.randomBytes(256).toString('hex')
      console.log(`user:`,username)
      console.log('pass:', password)
        try {
          //find user if any
          const user = await User.findOne({userId:username})
          console.log(`user from database`, user)

          if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

          crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {

            console.log(`hassh =================`, hashedPassword)
              //error was encountered
              if (err) { return cb(err); }
              
              //if password verify fails
              if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                console.log(`password fail`)
                return cb(null, false, { message: 'Incorrect username or password.' });//return false and message
              }

              //correct password was entered return user
              return cb(null,user);
            });

        } catch (error) {
          console.error('user lookup error',error);
          return cb(error); 
        }
        
      


        passport.serializeUser(function(user, cb) {
          process.nextTick(function() {
            return cb(null, user._id);
          });
        });
        
        passport.deserializeUser(function(id, cb) {
          process.nextTick(function() {
            const foundUser = User.findById(id)
            return cb(null, foundUser);
          });
        });
        
        
      }));


}