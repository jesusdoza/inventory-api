// import modules

const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config(); // to use with enviroment variables
const PORT = 8000;
const cors = require('cors')

// const uri = `mongodb+srv://${secrets}@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`
const uri = process.env.connectStr




        //instance of express
        const app = express();
        
        app.use(cors());
        app.set('view engine', 'ejs'); // for template
        app.use(bodyParser.urlencoded({extended:true})); //get body data
        app.use(bodyParser.json());
        app.use(express.static('public')) //use templates from folder



    async function connect (){
            //database wanted
        const dbName='Cata'
            //connect to mongo
        const client = await MongoClient.connect(uri,{useUnifiedTopology: true, useUnifiedTopology: true,})
            //get database
        const db =  await client.db(dbName);
            //get collection from database
        const collection =  await db.collection('inventory');
        
            //add new partnumber to inventory
        app.post('/inventory',(request,response)=>{

           

        })


            //get inventory numbers
        app.get('/', async (request, response)=>{
            try{  
                const allInventory = await collection.find().toArray()
                console.log(allInventory)
                
                // render index.ejs template passing in variable inventory holding allInventory
                response.render('index.ejs',{inventory:allInventory})
                
                response.end()
            }
            catch(err){
                throw new Error(`error at root inventory load ${err}`)
            }
        })




        //update single inventory amount entry
         app.put('/inventory', async (request, response)=>{
            console.log(`received put request on server to update using`)
            console.log(request.body)

           

        //     //{ //EXAMPLE OBJECT STRUCTURE
        //     //  partnumber:3103533,
        //     //  model:'ISX NON EGR',
        //     //  instock:0,
        //     //}

            try {
                //find specific entry
                const result = await collection.findOneAndUpdate(
                    //query
                    {
                        partnumber : request.body.partnumber,
                        model: request.body.model
                    },
                    
                    {// update
                        $set : {
                            instock: request.body.instock
                        }
                    }
                   ,
                    //options
                    {   //if query does not find anything insert it as new partnumber
                        upsert: false
                    }
                )
              
               response.redirect('/')
            } 
            catch (error) {
                response.sendStatus(404);
                response.end()
            }
        })
    }//end of connect function

    



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server on ${PORT}`)
})



    //instance of connect function
connect()






