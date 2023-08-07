const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
        default: "64d04f69803d64395abc7915"
    },
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
    },
    status:{
        type: String,
        required: true,
        default: "not saved"
    }
},{timestamps:true});


module.exports = mongoose.model('Metadatas', metadataSchema);