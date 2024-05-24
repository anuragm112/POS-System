const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        const mongooseUrl="mongodb+srv://anuragmiglani20:HuIxSri07BhBt7Kv@cluster0.10pmvum.mongodb.net/?retryWrites=true&w=majority";
        const connect=await mongoose.connect(mongooseUrl,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`mongodb: ${connect.connection.host}`)
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = connectDatabase 