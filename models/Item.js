const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    partnumber:{
        type:String,
        require:true,
        unique:true,    
    },
    model:{
        type:String,
        require:true, 
    },
    instock:{
        type:Number,
    },
    cores:{
        type:Number,
    },
    warranty:{
        type:Number,
    },
    problem:{
        type:Number,
    },
}, 
{
    collection:"inventory"
})