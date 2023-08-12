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

router.get('/:userID', authenticateToken, async (req, res) => {

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

})


router.get('/saved/:userID', authenticateToken, async (req, res) => {

  const userID = req.params.userID

  const savedMetas = await Metadatas.find({userID}).where("status").equals("saved").sort({metadataCreatedAt:-1})

  // console.log(savedMetas)

  try{
    if(savedMetas){
      res.status(200).json({status:200, message:"Fetched saved Successfully", metas:savedMetas})
    }else{
      res.status(200).json({status:200, message:"No saved metadata for this user", metas:savedMetas})
    }
  }catch(err){
    res.status(404).json({status:404, message:"Something went wrong", error:err})
  }

})


router.get('/files/:type/:userID', authenticateToken, async (req, res) => {

  const userID = req.params.userID
  const type = req.params.type
  // console.log(type)

  const sortedMetas = await Metadatas
  .find({ userID})
  .or([
    { primaryType: type },
    { specificFile: type }
  ])
  .sort({metadataCreatedAt:-1})

  // console.log(sortedMetas)

  try{
    if(sortedMetas){
      res.status(200).json({status:200, message:`Fetched file type (${type}) Successfully`, metas:sortedMetas})
    }else{
      res.status(200).json({status:200, message:`No file type (${type}) metadata for this user`, metas:sortedMetas})
    }
  }catch(err){
    res.status(404).json({status:404, message:"Something went wrong", error:err})
  }

})

router.put('/save/:id', async (req, res) => {

  const id = req.params.id

  // console.log(req.body)

    try{
      const updatedMetaData = await Metadatas.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
      )
        res.status(200).json({status:200, message: "Successfully updated metadata", metadata : updatedMetaData})
    }catch(err){
      res.status(404).json({status:404, message:"Something went wrong", error:err})
    }

})


router.get('/download/:id', async (req, res) => {

  const id = req.params.id

  const metas = await Metadatas.findById(id)
  let filename = metas.fileName
  let originalName = path.parse(metas.originalName).name
  console.log(filename);
  console.log("download route")
  const extension = path.extname(metas.originalName)
  const file = `./uploads/${filename}`;
  let newFile = ""
  fs.copyFile(file, `./uploads/${originalName}${extension}`, (err) => {
      if (err) throw err;
      newFile = path.join(__dirname, '..', 'uploads', `${originalName}${extension}`)
      // const newFile = `${__dirname}/uploads/${originalName}${extension}`
      console.log(newFile)
      // var data = JSON.parse(fs.readFileSync(newFile), 'utf8')
      // res.end(JSON.stringify(data, null, 2), 'utf8')
      console.log(`${file} was copied to ./uploads/${originalName}${extension}`);
  });
  // res.send(newFile);
  res.download(newFile, (err) => {
    if (err) {
      // Handle error (e.g., file not found)
      res.status(404).send('File not found');
    }
  });

})

router.post('/extract', authenticateToken, upload.single('file'), metaDataController.createMetaData);




module.exports = router