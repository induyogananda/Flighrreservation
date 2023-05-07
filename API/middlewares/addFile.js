//import cloudinary related modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")
require('dotenv').config()
//configure cloudinary
 cloudinary.config({
    cloud_name:"dbpcuk8oz",
    api_key:632952484518117,
    api_secret:"-E2b-XceIIL75fuvmwk-x3UWCfA"

})
//configure cloudinary storage
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"INDU",
            public_key:file.fieldname + '-' + Date.now()
        }
    }
})
const multerObj = multer({storage:clStorage})


module.exports = multerObj;
