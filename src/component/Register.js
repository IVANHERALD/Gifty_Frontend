import React from 'react'
import {TextField,Button} from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import gift from '../component/Images/gift1.avif';
import {useState} from 'react';
function Register() {
  const history =useNavigate();
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleRegister = async () => {
    // Create a registration object with the user's data
    const registrationData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('https://gifty-backend2.onrender.com/gift/signup', { // Replace with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 201) {
        // Registration was successful, you can handle success here
        console.log('User registered successfully');
        history('/'); 
      } else {
        // Registration failed, handle the error
        console.error('User registration failed');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error during registration:', error);
    }
  };
  return (
    <div className="app">
      <div className="Input-container-main">
        <div className="Input-container-register">
            <h3 className='Title'> Create a new account </h3>
          <TextField id="outlined"
          sx={{ '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
          InputLabelProps={{
            style: { color: '#cbb26a' }}}
          label="Name" value={name} onChange={(e)=>setName(e.target.value)}
          inputProps={{ style: { borderColor: '#cbb26a' } }} 
          focused={false}
          
        />
        
        <br/><br/>

        <TextField
          id="outlined"
          sx={{ '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
          label="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} InputLabelProps={{
            style: { color: '#cbb26a' }
          }}
          inputProps={{ style: { borderColor: '#cbb26a' } }} 
          focused={false} 
          
        />
        
        <br/><br/>

          <TextField label="Password"
          InputLabelProps={{
            style: { color: '#cbb26a' }
          }}  inputProps={{ style: { borderColor: '#cbb26a' } }}
          type="password"
          autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)}
          focused={false} // Add this line to ensure the focus color is also white
          id="outlined"
          sx={{ '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
        />
       <br/><br/>
      
        <Button id="button" variant="contained" onClick={handleRegister}>Register</Button> <br/><br/>
        <span>
          Already have an account? &nbsp; 
          <Link to='/'>login</Link>
        </span>
        
        </div>
        
      </div>

    </div>
  )
}

export default Register