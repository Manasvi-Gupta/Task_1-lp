//Don't forget to add config.env file in git-ignore afterwards.
const dotenv=require("dotenv");
const mongoose=require('mongoose');
const express=require('express');
const bcrypt=require('bcryptjs');
const app=express();
dotenv.config({path:'./config.env'});
require('./Db/conn');
app.use(express.json());
const User=require('./Models/userSchema');
//Linking the router files to make connections easy
app.use(require('./Router/auth'));
const PORT=process.env.PORT;
//Middleware
/*const middleware=(req,res,next)=>{
    console.log('Hello my middleware');
    next();
}*/
app.get('/',(req,res) =>{
    res.send('Hello World from the sever')

});
app.get('/rooms',(req,res) =>{
    res.send('Rooms available will be shown here')
});
app.get('/signup',(req,res) =>{
    res.send('Welcome to sign-up page')
});
app.get('/signin',(req,res) =>{
    res.send('Welcome to sign-in page')
});
app.get('/admin',(req,res) =>{
    res.send('Welcome to admin page')
});
app.listen(PORT,() =>{
    console.log(`Server is running at the port no ${PORT}`);
})
