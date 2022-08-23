const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore  =require('connect-mongo');//session store
const flash = require('express-flash');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
// const HttpsRedirect = require('./middleware/httpsRedirect')//!not used yet

//enviroment vars
require('dotenv').config({path:'./config/.env'});

// passport config
require('./config/passport')(passport);

const PORT = 8000;

const connectDB =  require('./config/db');
connectDB();


//authentication middleware
const {ensureAuth,ensureGuest} = require('./middleware/auth');

if(process.env.ENVIROMENT !== 'dev'){
    // app.use(HttpsRedirect)
}

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
        secure: false,//needs false local dev enviroment
    }
}))


    //passport middleware
    app.use(passport.initialize())
    app.use(passport.session())




////ROUTES FILES
const inventoryRoute = require('./routes/inventory')
const mainRoutes = require('./routes/main');
const httpsRedirect = require('./middleware/httpsRedirect');

//// ROUTES
app.use('/inventory',ensureAuth,inventoryRoute)
app.use ('/', mainRoutes)


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server on ${PORT}`)
})

 













