const { response } = require('express');
const jwt= require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
require('../db/conn');
const User = require("../Models/userSchema");
/*router.get('/',(req,res) =>{
    res.send('Hello World from the sever')
    
});
router.get('/rooms',(req,res) =>{
    res.send('Rooms available will be shown here')
});
router.get('/register',(req,res) =>{
    res.send('Welcome to sign-up page')
});
router.get('/signin',(req,res) =>{
    res.send('Welcome to sign-in page')
});
router.get('/admin',(req,res) =>{
    res.send('Welcome to admin page')
});*/
//Creating Sign-up route.
//using promises
//router.post('/register',(req,res)=>{
//const{name,email,role,phoneno,password}=req.body;
//if(!name ||!email || !role || !phoneno || !password){
//return res.status(422).json({error:"Please fill the required field properly"});
//}
//User.findOne({email:email})
//.then((userExist)=>{
//if(userExist){
//  return res.status(422).json({error:"Email already esists"});
//}
//const user=new User({name,email,role,phoneno,password});
//user.save().then(() =>{
//res.status(201).json({message: "user registered successfully"});
//}).catch((err)=>res.status(500).json({error:"Failed to register"}));
//}).catch(err =>{console.log(err);})
//});
// Using Async-Await
router.post('/register', async (req, res) => {
    const { name, email, role, phoneno, password } = req.body;
    if (!name || !email || !role || !phoneno || !password) {
        return res.status(422).json({ error: "Please fill the required field properly" });
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const user = new User({ name, email, role, phoneno, password });
        //Calling a function to store a password

        const userRegister = await user.save();
        res.status(201).json({ message: "user registered successfully" })
        //if(userExist){
        //  res.status(201).json({ message: "user registered successfully" });
        //}else{
        //res.status(500).json({ error: "Failed to register" });
        //}
    } catch (err) {
        console.log(err);
    }
});
//Creating Sign-in route.
//Conditions that need to be checked:
//1.No empty fields
//2.Email must be registered already.(Invalid Details error)
//3.Password should be matched.
//Login Route
router.post('/signin', async (req, res) => {
    // console.log(req.body);
    //res.json({message:"Hii Everyone"});
    try {
        let token;
        //Doing Object Destructuring
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the required field" })
        }
        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);
        if (userLogin) {
            //Compare method is used to compare the two passwords.
            //console.log(password);
            //console.log(userLogin.password);
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token= await userLogin.generateAuthToken();
            console.log(token);
            //Thr res.cookie()function is used to set the cookie name to value
            //The value may be a string or object converted
            res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+ 25892000000),
            httpOnly:true
            });
            console.log("Saved your jwt token successfully");

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials pass" });
            } else {
                res.json({ message: "User signed in succesfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});




module.exports = router;