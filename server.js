const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore  =require('connect-mongo');//session store
const flash = require('express-flash');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');

// const { ensureAuth, ensureGuest } = require('./middleware/auth')

//enviroment vars
require('dotenv').config({path:'./config/.env'});

// passport config
require('./config/passport')(passport);

const PORT = 8000;

const connectDB =  require('./config/db');
connectDB();



//authentication middleware
const {ensureAuth,ensureGuest} = require('./middleware/auth');


app.use(cors());
app.set('view engine', 'ejs'); // for template
app.use(express.static('public')); //use templates from folder
app.use(express.urlencoded({extended:true})); //get body data
app.use(express.json());
app.use(logger('dev'));


//Sessions
//express sessions must be before passport
app.use(session({
    //! change secret
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false, //dont create until something to save
    store:MongoStore.create({
        mongoUrl: process.env.connectStr,
    }),
    cookie:{
        maxAge:15*60*1000,
    }
}))


    //passport middleware
    app.use(passport.initialize())
    app.use(passport.session())




////ROUTES FILES
const inventoryRoute = require('./routes/inventory')
const mainRoutes = require('./routes/main')

//// ROUTES
app.use('/inventory',ensureAuth,inventoryRoute)
app.use ('/', mainRoutes)





app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server on ${PORT}`)
})




// //add another property to all entries that match a query
// app.post('/api/addtoall', async (request, response)=>{
//     console.log(`request body is: `,request.body);

//     // {will receive json object from client
//     //     propertyAdd : 'property name',
//     //     propertyValue : 'value',
//     //     targetSelector : 'partnumber',
//     //     targetValue:'target value'
//     // }

//     //what to add
//     const propertyAdd = request.body.propertyAdd.trim(); //new property to add
//     const propertyValue = request.body.propertyValue.trim(); // value of new property
//     const targetSelector = request.body.targetSelector.trim(); //select only specific entries with property
//     const targetValue = request.body.targetValue.trim(); // select only properties with this value
    
//     try {
//         // find specific entry
//         const result = await collection.findOneAndUpdate(
//             //query
//             {     
//                 //empty query selects all //computed object property name
//                     [targetSelector]:targetValue
//             },
//             {// add field
//                 $set : {
//                     [propertyAdd] : propertyValue
//                 }
//             }
//         )
//         console.log('success at api/addtoall', result)
    
//         // response.status(200).end()
//         response.redirect('/')
//     } 
//     catch (error) {
        
//         response.sendStatus(404);
//         response.end()
//         throw new Error(`error at api/addtoall ${error}`)
//     }
// })// end of PUT add another property to all entries that match a query










// //update single inventory amount entry
//     app.put('/inventory', async (request, response)=>{
    
//     console.log(`received put request on server to update using`)
//     console.log(request.body)

    

// //     //{ //EXAMPLE OBJECT STRUCTURE
// //     //  partnumber:3103533,
// //     //  model:'ISX NON EGR',
// //     //  instock:0,
// //     //}

//     try {
//         //find specific entry
//         const result = await collection.findOneAndUpdate(
//             //query
//             {      
//                 partnumber : request.body.partnumber
                
//             },
            
//             {// update
//                 $set : {
//                     instock: request.body.instock
//                 }
//             }
//             ,
//             //options
//             {   //if query does not find anything insert it as new partnumber
//                 upsert: false
//             }
//         )
//         console.log('success at /inventory put')
        
//         response.status(200).end()
//         // response.redirect('/') //good
        
//     } 
//     catch (error) {
//         console.log('error at put')
        
//         response.sendStatus(404);
//         response.end()
//         throw new Error(`error at put ${err}`)
//     }
// })// end of put /inventory
   













