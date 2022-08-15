
//specify strategy to use with passport
const LocalStrategy  = require('passport-local')

const crypto = require('crypto');
//user database
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = async (passport)=>{
    passport.use(new LocalStrategy(function verify(username, password, cb) {
        //! implement the password look up 

        
        
        if (!user) { return cb(err); }
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      
        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
              return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, row);
          });
        
      }));


}