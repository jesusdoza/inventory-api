// import modules
const secrets = require('./secrets.js')
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000;


const uri = `mongodb+srv://${secrets.cata_key}@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`


//instance of express
const app = express();


// inventory = [
//     {partnumber:'3618046',
//         model:'Celect',
//         instock:0,
//     },
//     {partnumber:'3619037',
//         model:'Celect',
//         instock:0,
//     },
//     {partnumber:'3614473',
//         model:'Celect',
//         instock:0,
//     },
//     {partnumber:'3408303',
//         model:'Celect Plus',
//         instock:0,
//     },
//     {partnumber:'3408300',
//         model:'Celect Plus',
//         instock:0,
//     },
//     {partnumber:'3096662',
//         model:'Celect Plus',
//         instock:0,
//     },
//     {partnumber:'3944105',
//         model:'ISC',
//         instock:0,
//     },
//     {partnumber:'3944125',
//         model:'ISC',
//         instock:0,
//     },
//     {partnumber:3944124,
//         model:'ISB',
//         instock:0,
//     },
//     {partnumber:3945868,
//         model:'ISB',
//         instock:0,
//     },
//     {partnumber:3990517,
//         model:'ISB',
//         instock:0,
//     },
//     {partnumber:3942858,
//         model:'ISB',
//         instock:0,
//     },
//     {partnumber:3942335,
//         model:'ISB',
//         instock:0,
//     },
//     {partnumber:3492860,
//         model:'ISB',
//         instock:0,
//     },
//     {partnumber:3682729,
//         model:'ISX EGR',
//         instock:0,
//     },
//     {partnumber:3683289,
//         model:'ISX EGR',
//         instock:0,
//     },
//     {partnumber:3684009,
//         model:'ISX EGR',
//         instock:0,
//     },
//     {partnumber:3684275,
//         model:'ISX EGR',
//         instock:0,
//     },
//     {partnumber:4921776,
//         model:'ISX',
//         instock:0,
//     },
//     {partnumber:3681404,
//         model:'ISX/ISM',
//         instock:0,
//     },
//     {partnumber:3681405,
//         model:'ISX/ISM',
//         instock:0,
//     },
//     {partnumber:3408501,
//         model:'ISX/ISM',
//         instock:0,
//     },
//     {partnumber:3680509,
//         model:'ISX NON EGR',
//         instock:0,
//     },
//     {partnumber:3408426,
//         model:'ISX NON EGR',
//         instock:0,
//     },
//     {partnumber:3103533,
//         model:'ISX NON EGR',
//         instock:0,
//     }


// ]


MongoClient.connect(uri,{useUnifiedTopology: true, useUnifiedTopology: true,})
    .then(client =>{


        // database working with
        const db = client.db('Cata');

        //collection working on inside the database
        const quotesCollection = db.collection('inventory');

        console.log('connected to database ');

        // MIDDLEWARE 
        // ===================================================
         
        app.set('view engine', 'ejs'); // for template
        app.use(bodyParser.urlencoded({extended:true})); //get body data
        app.use(bodyParser.json());
        app.use(express.static('public')) //use templates from folder

        // MIDDLEWARE 
        // ===================================================
        

        app.get('/', async (request, response)=>{

            const allInventory = await quotesCollection.find().toArray()
            // console.log(allInventory)
            // response.send(allInventory)


            //render index.ejs template passing in variable inventory holding allInventory
            response.render('index.ejs',{inventory:allInventory})
        
        })

        //update inventory amount

         app.put('/inventory', async (request, response)=>{
            console.log(`received put request on server to update using`)
            console.log(request.body)

            //{ //EXAMPLE OBJECT STRUCTURE
            //  partnumber:3103533,
            //  model:'ISX NON EGR',
            //  instock:0,
            //}

           const result = await quotesCollection.findOneAndUpdate(
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

                console.log(result)

               response.redirect('/');
            })
           
    })//Mongo client end =========================================







app.listen(process.env.PORT || PORT, ()=>{
    console.log('server on ')
})







