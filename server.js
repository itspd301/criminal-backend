const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const router = require('./route')
const cors =  require('cors')
app.use(cors())




mongoose.connect('mongodb://localhost:27017/criminal')
    .then(console.log("Working..."))
    .catch((error)=>{
        console.log(error);
    })

app.get('/card',(req,res)=>{
    res.send(console.log("hehehe"))
})

app.use('/',router)

app.listen(8000,console.log("Code Started..."))

    