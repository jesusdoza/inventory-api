// const { response } = require("express");
const Parts = require("../models/Part");
const Items = require("../models/Item");
const path = require('path')


module.exports.getPage = async (req,res)=>{

    try {
        // res.send('react app')
        // console.log(path.resolve("./"))
        res.sendFile("index.html",{root:path.resolve("./public/reactapp")})

    } catch (error) {
        console.log(`error getting react inventory`,error)
        res.status(500).json({"message":"error getting react inventory"})
    }
    
}

