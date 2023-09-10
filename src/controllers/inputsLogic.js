const fs = require('fs');
const path = require('path');
const multer = require('multer');
const input = require('../models/inputSchema');
const sharp = require('sharp');
const inputValidator = require('../validator/sizeSchema');
const CustomErrorHandler = require('../services/CustomErrorHadler')

// et up Multer for handling file uploads and set max size of the image
const storage= multer.diskStorage({
    destination:(req, file, cb)=> cb(null, 'uploads/'),
    filename: (req, file, cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName);
    }
});

const handleMultipart= multer({storage, limits:{fileSize: 1000000*5}}).single('image')// 5 mb

// logic 
const uploadControll = {
    async uploadImage(req, res, next){
        //logic to upload image
        handleMultipart(req, res, async (err)=>{
            if(err){
                return next(CustomErrorHandler.imageUplodingFails(err.message));
            }
            const filePath = req.file.path;

             // validate input form data   
            const { error } = inputValidator.validate(req.body)

            if (error) {     //to handle validation error
                //delete image if validation fails
                fs.unlink(`${appRoot}/${filePath}`, (err)=>{
                    if(err){
                        return next(CustomErrorHandler.imageUplodingFails(err.message))
                    }
                
                }) 
                return next(error); 
            }

            const { width, height, quality, format } = req.body;

            const { path: imagePath } = req.file;

            try{
                const resizedImage = await sharp(imagePath)
                .resize({ width, height })
                .jpeg({ quality })
                .toFormat(format)
                .toBuffer();
        
                // send response to client
                res.set('Content-Type', `image/${format}`);
                res.send(resizedImage);
                }catch(error){
                console.log(error)
                return next(CustomErrorHandler.imageProcessingFails(err.message))
                }

        })

    }
}

module.exports = uploadControll;

