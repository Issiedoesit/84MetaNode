const express = require('express')
const exiftoolBin = require('dist-exiftool');
const exiftool =  require('node-exiftool');
const fs = require('fs');
const path = require('path');
const Metadatas = require("../models/metadatasModel")
const authenticateToken = require('../middlewares/authenticateToken')



const router = express.Router()

router.get('/:userID', async (req, res) => {

  const userID = req.params.userID

  const metas = await Metadatas.find({userID})

  try{
    if(metas){
      res.status(200).json({status:200, message:"Fetched Successfully", metas:metas})
    }else{
      res.status(200).json({status:200, message:"No metadata for this user", metas:metas})
    }
  }catch(err){
    res.status(404).json({status:404, message:"Something went wrong", error:err})
  }

  console.log(metas)
})

router.post('/extract', authenticateToken,  async (req, res) => {
    // fs.readFile('../Backend/new nosa lh.pdf', function (err, data) {
    //     if (err)
    //       throw err;
    //     else {
    //       exif.metadata(data, function (err, metadata) {
    //         if (err)
    //           throw err;
    //         else
    //           console.log(metadata);
    //       });
    //     }
    //   });

      try {
        // if(!req.file){
        //     return res.status(404).send({message:"File Not Found",status:404})
        // }
    const PHOTO_PATH = path.join(__dirname, '../Coldplay_-_Fix_You_b64f0d295.mp3')
    const rs = fs.createReadStream(PHOTO_PATH)
    // console.log("PHOTO_PATH => ", PHOTO_PATH);
    // console.log("rs => ", rs);
    const ep = new exiftool.ExiftoolProcess(exiftoolBin)
    ep.open()
      .then(() => ep.readMetadata(rs, ['-File:all']))
      .then(async (result) => {
          // let metadata=new MetaDataModel({
          //     fileName:req.file.filename,
          //     originalName:req.file.originalname,
          //     size:req.file.size,
          //     information:result.data[0]
          //     });
          // metadata=await metadata.save();
          // console.log(result);
        let metas = {
          fileName:result.data[0].Title || rs.path,
          originalName:result.data[0].Title || rs.path,
          size:120030,
          information:result.data[0],
        }
        // const contacts = await Contacts.create({
        //   name:result.data[0].title,
        //   email:"jane@doe.com",
        //   phone:"1234567",
        //   dp:"https://res.cloudinary.com/issie/image/upload/v1688227224/memojis/fema…",
        //   gender:"female"
        // })
        const meta = await Metadatas.create({
         ...metas
        })
        if(meta){
          console.log(meta);
          res.status(200).json(meta);
        }
    })
    .then(() => ep.close(), () => ep.close())
    .catch(console.error);

    } catch (error) {
        console.error(error);
    }

      // res.send('Extracted!!!')
})




module.exports = router