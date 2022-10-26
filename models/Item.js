const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    partnumber:{
        type:String,
        require:true,
        unique:true,    
    },
    enginemake:{
        type:String,
        require:true, 
    },
    model:{
        type:String,
        require:true, 
    },
    instock:{
        type:Number,
        default:1,
    },
    cores:{
        type:Number,
        default:0,
    },
    warranty:{
        type:Number,
        default:0,
    },
    problem:{
        type:Number,
        default:0,
    },
    groups:{
        type:[String],
        require:true,
    },
    createdBy:{
        type:String,
        require:true,
    }
}, 
{
    collection:"inventory"
})

module.exports = mongoose.model('Item', ItemSchema)