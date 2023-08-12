const exiftoolBin = require('dist-exiftool');
const exiftool =  require('node-exiftool');
const fs = require('fs');
const path = require('path');
const Metadatas = require("../models/metadatasModel")

module.exports.createMetaData=(req,res,next)=>{
    // console.log("createMetaData req => ", req.file)
    try {
        if(!req.file){
            return res.status(404).send({message:"File Not Found",status:404})
        }
    const primaryType = req.file.mimetype.split('/')[0]
    const specificFile = req.file.mimetype.split('/')[1]
    const PHOTO_PATH = path.join(__dirname, '../uploads/'+req.file.filename)
    const rs = fs.createReadStream(PHOTO_PATH)
    const ep = new exiftool.ExiftoolProcess(exiftoolBin)
    ep.open()
      .then(() => ep.readMetadata(rs, ['-File:all']))
      .then(async (result) => {
          let metadata=new Metadatas({
              userID:req.body.userID,
              fileName:req.file.filename,
              originalName:req.file.originalname,
              size:req.file.size,
              mime:req.file.type,
              primaryType,
              specificFile,
              file:req.file,
              information:result.data[0]
              });
          metadata=await metadata.save();
          return res.status(200).json({status:200, message:"Metadata extracted successfully", metadata:metadata});
    })
    .then(() => ep.close(), () => ep.close())
    .then(()=>{

        // delete the file from the uploads folder to save space
        if (fs.existsSync (PHOTO_PATH)) { 
            // console.log('Exists'); 
            fs.unlinkSync (PHOTO_PATH) 
        }
    })
    .catch(console.error);

    } catch (error) {
        next(error);
    }
}