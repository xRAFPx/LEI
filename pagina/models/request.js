const mongoose = require('mongoose')

//create a schema
const RequestShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    priority:{type:mongoose.Schema.Types.ObjectId, ref:"requestPrior"},
    type:{type:mongoose.Schema.Types.ObjectId, ref:"requestType"},
    nature:{type:mongoose.Schema.Types.ObjectId, ref:"requestNature"},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    attach:{type:mongoose.Schema.Types.Buffer},
    description:{type:String}
})

//create a model based on that schema
const Request = mongoose.model('Request', RequestShema)
//export model
module.exports = Request;