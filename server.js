const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

//Middlewares
app.use(express.json());
app.use(cors());


//File Imports
const authRoutes = require('./routes/auth')


//Route midllewares
app.use('/auth',authRoutes);


//Connecting to db
mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('Connected to db');
        app.listen(process.env.PORT,()=>{
            console.log('Listening on port '+ process.env.PORT);
        })   
    })
    .catch((err)=>{
        console.log(err);
    })
