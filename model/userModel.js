let mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type : Number
    },
    birthDay: {
        type: Date
    },
    account: {
        type: String,
        enum : ['Electronics' , 'Toy Store' ]
    },
    createdAt: {
        type: Date,
        default : Date.now()
    }
})


module.exports = mongoose.model('User', userSchema)