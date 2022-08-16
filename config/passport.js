
//specify strategy to use with passport
const LocalStrategy  = require('passport-local')

const crypto = require('crypto');
//user database
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = async (passport)=>{
    passport.use(new LocalStrategy(function verify(username, password, cb) {

        try {
          //find user if any
          const user = User.findOne({username:username})
          if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

          crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            
              //error was encountered
              if (err) { return cb(err); }
              
              //if password verify fails
              if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });//return false and message
              }
              //correct password was entered 
              return cb(null, row);
            });

        } catch (error) {
          console.error('user lookup error',error);
          return cb(err); 
        }
        
      


        //if no user found
        
        
      }));


}