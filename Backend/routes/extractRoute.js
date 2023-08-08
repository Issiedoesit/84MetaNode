const express = require('express')
const exiftoolBin = require('dist-exiftool');
const exiftool =  require('node-exiftool');
const fs = require('fs');
const path = require('path');
const Metadatas = require("../models/metadatasModel")
const authenticateToken = require('../middlewares/authenticateToken')
const {uploadFile}=require("../middlewares/uploadFile.middleware")
const metaDataController=require("../controllers/metadata.controller");
const multer  = require('multer')
const upload = multer({ dest: './uploads' })


const router = express.Router()

router.get('/:userID', async (req, res) => {

  const userID = req.params.userID

  const metas = await Metadatas.find({userID}).sort({metadataCreatedAt:-1})

  try{
    if(metas){
      res.status(200).json({status:200, message:"Fetched Successfully", metas:metas})
    }else{
      res.status(200).json({status:200, message:"No metadata for this user", metas:metas})
    }
  }catch(err){
    res.status(404).json({status:404, message:"Something went wrong", error:err})
  }

  // console.log(metas)
})

router.post('/extract', authenticateToken, upload.single('file'), metaDataController.createMetaData);




module.exports = router