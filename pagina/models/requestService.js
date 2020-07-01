const mongoose = require('mongoose')

//create a schema
const RequestServiceShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description:{type:String}
})

//create a model based on that schema
const RequestService = mongoose.model('requestService', RequestServiceShema)
//export model
module.exports = RequestService;