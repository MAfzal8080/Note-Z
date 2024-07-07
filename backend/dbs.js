const mongoose = require('mongoose')
require('dotenv').config()

const server=mongoose.connect(process.env.MONGO_URI , { retryWrites: true, w: 'majority' }).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log((err))
});
module.exports=server