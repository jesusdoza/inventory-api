const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:Buffer,
        required:true,
    },
    salt:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        defaul:Date.now(),
        immutable:true,
    },
    role:{
        type:String,
        default:'basic'
    },
    version:{
        type:Number,
        default:1
    },
    email:{
        unique:true,
        type:String,
    }
    
},
{
    collection:"users"
}
)

// Password hash middleware.
UserSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err) }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err) }
        user.password = hash
        next()
      })
    })
  })
  

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    })
  }




module.exports  = mongoose.model('User', UserSchema)