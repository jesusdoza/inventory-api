// import modules

const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config(); // to use with enviroment variables
const PORT = 8000;
const cors = require('cors');
const { Collection } = require('mongodb');

// const uri = `mongodb+srv://${secrets}@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`
const uri = process.env.connectStr

let db; //holds database
let collection ; //holds collection from database
    
const dbName='Cata'
const collectionName='inventory'


        //instance of express
        const app = express();
        
        app.use(cors());
        app.set('view engine', 'ejs'); // for template
        app.use(bodyParser.urlencoded({extended:true})); //get body data
        app.use(bodyParser.json());
        app.use(express.static('public')) //use templates from folder



  


            //connect to mongo
        MongoClient.connect(uri,{useUnifiedTopology: true, useUnifiedTopology: true,})
        .then(  client =>{
                //get database
            db = client.db(dbName);

              //get collection from database
            collection = db.collection(collectionName)

        })



        //delete one item
        app.delete('/inventory', async (request, response)=>{
            console.log('delete recieved')

            let part='delete part placeholder'

            part=request.body.partnumber
            
           
            console.log(request.body)

            //search collection for part
            const cursor = await collection.find({ 
                'partnumber' : part         
        }).toArray()
           
            console.log(cursor)


            if(cursor.length){
            //if part exists delete it
                const result = await collection.deleteOne({
                    'partnumber':part
                })

                console.log(`deleting`)
                console.log(result)
                response.status(200).send({deleted:{ cursor}})
                response.end()
                // response.redirect('/')
                
            }

            else{
            //else item not in the database so do nothing

               console.log(`not in database`)
                response.send({no_such_item:part})
                response.end()
            }
            

        })//end of delete
            
        
 
        




            //add new partnumber to inventory
        app.post('/inventory', async (request, response)=>{
            console.log(`post recieved`)
            let part='new part placeholder',
            newModel= 'new model placeholder',
            newQuantity = 0

            part=request.body.part.trim()
            newModel= request.body.model.trim()
            newQuantity = request.body.quantity

           
            //build object from form values
            const newItem ={
                partnumber:part,
                model:newModel,
                instock:newQuantity,
            }

            console.log(newItem)

           
            //search collection for part
            const cursor = await collection.find({ 
                'partnumber' : part         
            }).toArray()
           
            console.log(cursor.length)

            //of cursor is not [] empty then database already has item
            if(cursor.length){
            //if part exists do not insert into database
                response.status(409).send({error:{ newPart :part , problem:'already exists'}})
                response.end()
            }

            else{
            //else newItem not in the database so insert it

                collection.insertOne(newItem)
                // response.send({inserted:newItem})
                response.redirect('/')
            }

           



        })//end post /inventory




            //get inventory numbers
        app.get('/', async (request, response)=>{
            try{  
                const allInventory = await collection.find().toArray()
                // console.log(allInventory)
                
                // render index.ejs template passing in variable inventory holding allInventory
                response.render('index.ejs',{inventory:allInventory})
                
                response.end()
            }
            catch(err){
                throw new Error(`error at root inventory load ${err}`)
            }
        })//end of get /




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
                console.log('success at put')
              
                
               response.redirect('/')
               
            } 
            catch (error) {
                console.log('error at put')
                
                response.sendStatus(404);
                response.end()
                throw new Error(`error at put ${err}`)
            }
        })// end of put /inventory
   

    



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server on ${PORT}`)
})









