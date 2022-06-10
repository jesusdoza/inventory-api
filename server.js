// import modules
// const secrets = process.env.cata; //enviroment var for credentials else import it 
const secrets = require('./secrets').cata_key
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000;
const cors = require('cors')

const uri = `mongodb+srv://${secrets}@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`


        //instance of express
        const app = express();

        app.use(cors());
        app.set('view engine', 'ejs'); // for template
        app.use(bodyParser.urlencoded({extended:true})); //get body data
        app.use(bodyParser.json());
        app.use(express.static('public')) //use templates from folder



    async function connect (){
        const client = await MongoClient.connect(uri,{useUnifiedTopology: true, useUnifiedTopology: true,})
        const db =  await client.db('Cata');
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
            // console.log(request.body)

           

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
                        partnumber : request.body.partnumber
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
               response.redirect('/');
            } 
            catch (error) {
                
            }
        })
    }//end of connect function

    



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server on ${PORT}`)
})



    //instance of connect function
    let collection = connect()






