require('dotenv').config()
let mongoose = require('mongoose');


exports.connection = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,

        });
        console.log('connected to mongodb')
    } catch (e) {
        console.log('Error noted at db/connection' , e);
    }
    
}






