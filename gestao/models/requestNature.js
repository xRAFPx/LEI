const mongoose = require('mongoose')

//create a schema
const RequestNatureShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description:{type:String}
})

//create a model based on that schema
const RequestNature = mongoose.model('requestNature', RequestNatureShema)
//export model
module.exports = RequestNature;