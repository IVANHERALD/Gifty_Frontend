import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import {TextField,Button} from '@mui/material';
import "./styles/style.css"
import login_image from '../component/Images/gift1.avif'
import macroons from '../component/Images/profile_flower.jpg'
import { useAuthValue } from "./AuthContext";
function Login() {
  const{setcurrentemail} = useAuthValue();

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  let history = useNavigate();
  const handleLogin = async () => {
    // Create a login object with the user's data
    const loginData = {
      email,
      password,
    };
  
    try {
      const response = await fetch('https://gifty-backend2.onrender.com/gift/login', { // Replace with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.status === 200) {
        // Login was successful, you can handle success here
        console.log('User logged in successfully');
        setcurrentemail(loginData.email);
console.log(loginData.email);
        history('/Home'); // Redirect to the dashboard or another page
      } else if (response.status === 401) {
        // Authentication failed, handle the error
        console.error('Authentication failed');
      } else {
        // Handle other error cases (e.g., 500 for server errors)
        console.error('Login failed');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error during login:', error);
    }
  };
  
const handleClick=()=>{
  let path='/Register';
  history(path);

}
  return (
    <div className="app">
      <div className="Input-container-main"
      >
        <div className="Input-container-login">
          <h2>LOGIN</h2>

          <TextField sx={{ '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
          InputLabelProps={{
            style: { color: '#cbb26a' }}}
            inputProps={{ style: { borderColor: '#cbb26a' } }} focused={false}
          id="outlined"
          label="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}
          
        />
        
        <br/><br/><br/>

          <TextField label="Password"
          type="password"
          autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} InputLabelProps={{
            style: { color: '#cbb26a' }}} id="outlined"
            sx={{ '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            inputProps={{ style: { borderColor: '#cbb26a' } }} focused={false} 
        /><br/><br/><br/>
        <Button id="button" variant="contained" onClick={handleLogin}>Login</Button> &nbsp;&nbsp;&nbsp;
        <Button id="button" variant="contained" onClick={handleClick}>Sign up</Button>
        </div>
       {/* <div className="Input-container-image">
        <img src={macroons}  alt="login_image" className="image" />
        </div>
  */}
      </div>

    </div>

  );
}

export default Login;