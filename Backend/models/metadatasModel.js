const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
        default: "nouser"
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
    mime:{
        type:String
    },
    information:{
        type:Object
    },
    status:{
        type: String,
        required: true,
        default: "not saved"
    },
    file: {
        type: Object,
        required: true,
    },
},{timestamps: { createdAt: 'metadataCreatedAt', updatedAt: 'metadataUpdatedAt' }});


module.exports = mongoose.model('Metadatas', metadataSchema);