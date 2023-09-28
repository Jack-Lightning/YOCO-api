const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');

//Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());


//File Imports
const authRoutes = require('./routes/auth')
const fileRoutes = require('./routes/fileRoutes.js')

//Route midllewares
app.use('/auth',authRoutes);
app.use('/files',fileRoutes);

//Connecting to db
mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('Connected to db ');
        app.listen(process.env.PORT,()=>{
            console.log('Listening to requests');
        })   
    })
    .catch((err)=>{
        console.log(err);
    })
