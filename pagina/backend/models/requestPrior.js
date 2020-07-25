const mongoose = require('mongoose')

//create a schema
const RequestPriorShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description:{type:String}
})

//create a model based on that schema
const RequestPrior = mongoose.model('requestPrior', RequestPriorShema)
//export model
module.exports = RequestPrior;