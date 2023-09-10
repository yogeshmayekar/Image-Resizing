const express = require('express'); //importing express
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.APP_PORT;
const DB_URL =process.env.DB_URL;
const routes = require('./src/routes/index')
const path =require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express(); //created express instance

// database connection 
mongoose.connect(DB_URL).then(()=>{
    console.log('Database Connected');
}).catch((error)=>{
    console.log("DB connection failed" + error);
})

global.appRoot = path.resolve(__dirname) // to use appRoot as a global variable
app.use(express.urlencoded({extended : false}))  //for multi-part data
app.use(express.json())
app.use(routes)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})