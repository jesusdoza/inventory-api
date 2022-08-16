const mongoose = require('mongoose')



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
    }
    
},
{
    collection:"users"
}
)

module.exports  = mongoose.model('User', UserSchema)