const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true,
        index:true
    },
    originalName:{
        type:String
    },
    size:{
        type:Number
    },
    information:{
        type:Object
    }
},{timestamps:true});


module.exports = mongoose.model('Metadatas', metadataSchema);