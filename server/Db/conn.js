const mongoose=require('mongoose');
const DB=process.env.DATABASE;
mongoose.connect( DB,{useNewUrlParser:true})
.then(()=>console.log("connected to MongoDB"))
.catch(err=>console.log("Could not connect to MongoDB" ,err))