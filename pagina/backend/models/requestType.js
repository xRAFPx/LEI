const mongoose = require('mongoose')

//create a schema
const RequestTypeShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description:{type:String}
})

//create a model based on that schema
const RequestType = mongoose.model('requestType', RequestTypeShema)
//export model
module.exports = RequestType;