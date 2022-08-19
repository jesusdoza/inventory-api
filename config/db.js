const mongoose = require('mongoose')

const connectDB =  async ()=>{
    try {
        const conn = await mongoose.connect(process.env.connectStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

module.exports = connectDB;