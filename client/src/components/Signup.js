import React,{useState} from 'react'
import{useNavigate} from 'react-router-dom';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
export const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const [user,setUser]=useState({
        name:"",email:"",role:"",phoneno:"",password:""
    });
    let name,value;
    const handleInputs=(e) =>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value})
    }
    const PostData=async (user,e) =>{
        e.preventDefault();
        //Using Object De structuring
        const {name,email,role,phoneno,password}=user;
        const res=await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"

            },
            body: JSON.strigify({
                name:name,
                email:email,
                role:role,
                phoneno:phoneno,
                password:password,
            }),
        });
        const data= await res.json();
        if(data.status === 422|| !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registration Successful");
            console.log("Registration Successful");
        }
    }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form method="POST" >
                    <TextField fullWidth  label='Name' name='name' value={user.name} onChange={handleInputs} placeholder="Enter your name" />
                    <TextField fullWidth label='Email' name='email' value={user.email} onChange={handleInputs}placeholder="Enter your email" />
                    <TextField fullWidth label='Role' name='role' value={user.role} onChange={handleInputs} placeholder="Enter your role"/>
                    <FormControl component="fieldset" style={marginTop}>
                        
                    </FormControl>
                    <TextField fullWidth label='Phone-number' name='phoneno' value={user.phoneno} onChange={handleInputs} placeholder="Enter your phone number" />
                    <TextField fullWidth label='Password' name='password'  value={user.password} onChange={handleInputs}placeholder="Enter your password"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' variant='contained' color='primary' onClick={PostData}>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}
