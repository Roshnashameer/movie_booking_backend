// load env file
require('dotenv').config()
// import express 
const express = require('express')
const cors=require('cors')
const router = require('./routes/routes')
require('./db/connection')
// create server using express
const MovieServer = express()
// convert all incoming json data to js data
MovieServer.use(express.json())
MovieServer.use(cors())
MovieServer.use(router)

const PORT = 4005 || process.env.PORT
MovieServer.listen(PORT, () => {
    console.log(`________MovieServer  started at ${PORT}___`);
})
MovieServer.get('/',(req,res)=>{
    res.send('<h1>Project server started</h1>')
})