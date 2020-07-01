const mongoose = require('mongoose')

//create a schema
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required:true, 
        unique:true, 
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    contact:{type: String, required:true},
    name:{type:String, required:true}
})

//create a model based on that schema
const User = mongoose.model('User', userSchema)

//export model
module.exports = User;