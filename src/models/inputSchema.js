const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const APP_URL = process.env.APP_URL
const Schema = mongoose.Schema;

// schema created for input size of resizing image 
const inputsSchema = new Schema({
    image: {type: String, required:true, get:((image)=>{
        // url where image get stored
        return `${ APP_URL }/${image}`;
    })},
},{timestamps:false, id:false});

mongoose.set('toJSON', { getters: true }); // to avoid the virtual properties of the mongoose

// to create a model 
const inputSchema = mongoose.model('input', inputsSchema);
module.exports = inputSchema;