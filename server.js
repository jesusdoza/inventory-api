// import modules
const EXPRESS = require('express')
const BODYPARSER= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000;


const uri = `mongodb+srv://${secrets.cata_key}@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`


//instance of express
const app = EXPRESS();


inventory = {
    3618046:{
        model:'Celect',
        instock:0,
    },
    3619037:{
        model:'Celect',
        instock:0,
    },
    3614473:{
        model:'Celect',
        instock:0,
    },
    3408303:{
        model:'Celect Plus',
        instock:0,
    },
    3408300:{
        model:'Celect Plus',
        instock:0,
    },
    3096662:{
        model:'Celect Plus',
        instock:0,
    },
    3944105:{
        model:'ISC',
        instock:0,
    },
    3944125:{
        model:'ISC',
        instock:0,
    },
    3944124:{
        model:'ISB',
        instock:0,
    },
    3945868:{
        model:'ISB',
        instock:0,
    },
    3990517:{
        model:'ISB',
        instock:0,
    },
    3942858:{
        model:'ISB',
        instock:0,
    },
    3942335:{
        model:'ISB',
        instock:0,
    },
    3492860:{
        model:'ISB',
        instock:0,
    },
    3682729:{
        model:'ISX EGR',
        instock:0,
    },
    3683289:{
        model:'ISX EGR',
        instock:0,
    },
    3684009:{
        model:'ISX EGR',
        instock:0,
    },
    3684275:{
        model:'ISX EGR',
        instock:0,
    },
    4921776:{
        model:'ISX',
        instock:0,
    },
    3681404:{
        model:'ISX/ISM',
        instock:0,
    },
    3681405:{
        model:'ISX/ISM',
        instock:0,
    },
    3408501:{
        model:'ISX/ISM',
        instock:0,
    },
    3680509:{
        model:'ISX NON EGR',
        instock:0,
    },
    3408426:{
        model:'ISX NON EGR',
        instock:0,
    },
    3103533:{
        model:'ISX NON EGR',
        instock:0,
    },


}


MongoClient.connect(conString,{useUnifiedTopology: true, useUnifiedTopology: true,})
    .then(client =>{


        // database working with
        const db = client.db('Cata');

        //collection working on inside the database
        const quotesCollection = db.collection('inventory');

         console.log('connected to database ');

        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        // app.use(express.static('public'))

        // MIDDLEWARE 
        // ===================================================
        

        app.get('/inventory', async (request, response)=>{

            const all = await quotesCollection.find().toArray()
            console.log(all)
            res.send(all)
        
        })
        


        // app.get('/', async (req, res)=>{
        //     // res.sendFile(__dirname + '/index.html') //send none template

        //     const allQuotes = await quotesCollection.find().toArray();

           
        //             // console.log(allQuotes)
        //      //quotes is variable and all quotes is value from above
        //      // what template ejs, what variables are passing along as key: value pairs
        //     res.render('index.ejs', {quotes:allQuotes})

        // });

        // app.post('/quotes', async (req, res)=>{
        //    const result = await quotesCollection.insertOne(req.body)
        //         console.log(result)

        //         res.redirect('/');
        // });


        // app.get('/api', async (req, res)=>{
        //     const all = await quotesCollection.find().toArray()
        //     console.log(all)
        //     res.send(all)
        // });


//put UPDATE
        // app.put('/quotes', async (request, response)=>{
        //     console.log(`received put request on server to update using`)
        //     console.log(request.body)

        //    const result = await quotesCollection.findOneAndUpdate(
        //             //query
        //             {name : 'jesus'},
                    
        //             {// update
        //                 $set : {
        //                     name :request.body.name,
        //                     quote: request.body.quote
        //                 }
        //             }
        //            ,
        //             //options
        //             {   //if query does not find anything insert it 
        //                 upsert: true
        //             }
        //         )

        //         // console.log(result)

        //        response.json('succes**** from server')
        //     })




            // app.delete('/quotes', async (request, response) => {
            //     //returns promise
            //     console.log(`delete received for ${request.body.name} @ server `)
            //     const result = await quotesCollection.deleteOne(
            //         {
            //             name: request.body.name
            //         }
            //     )
            //     console.log(result);

            //     if(result.deletedCount==0){
            //         response.json('delete count is 0 nothing was deleted')
            //     }
            //     else{
            //         response.json('success deleted ')
            //     }
                

               
            // })

           
    })//Mongo client end =========================================
// ===============================






app.listen(PORT, ()=>{
    console.log(`server on port ${PORT}`)
})







