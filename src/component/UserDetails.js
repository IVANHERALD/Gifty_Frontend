import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails, Stepper, Step, StepLabel, Button, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel,Card
} from '@mui/material';
import './styles/UserDetails.css';
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuthValue } from './AuthContext';

import { useNavigate } from 'react-router-dom';
import Header from './Header';

const steps = ['Step 1', 'Step 2', 'Step 3']; // Array of steps

const UserDetails = () => {
  const [Name, setName] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [Pincode, setPincode] = useState('');
  const [Locality1, setLocality1] = useState('');
  const [Address1, setAddress1] = useState('');
  const [Landmark, setLandmark] = useState('');
  const [AlternatePhoneno, setAlternatephoneno] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');

  const { currentemail } = useAuthValue();
  const [displayName, setDisplayName] = useState(currentemail);
  const [selectedValue, setSelectedValue] = useState('');
  const {searchResults} = useAuthValue();
  const [showAddress, SetshowAddress] = useState(false);
  const DisplayAddress = () => {
    SetshowAddress(true);
  }
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    setDisplayName(currentemail?.displayName || '');

  }, [currentemail]);
  const UserDetails = (event) => {
    event.preventDefault();
   
  };
const storeDetails=async(event)=>{
  event.preventDefault();
  const UserData = {
   email:currentemail, Name,
    MobileNo, Pincode, Locality1, Address1, Landmark, AlternatePhoneno,city,state,items:searchResults
  };
  try {
    const response = await fetch('https://gifty-backend2.onrender.com/gift/orderDetails', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserData),
    });

    if (response.status === 201) {
      
      console.log('Item added to the cart successfully');
    } else {
      console.error('Failed to add item to the cart');
    }
  } catch (error) { console.error('Error during adding to cart:', error);
}
}

    
      
      const [amount, setamount] = useState('');

      const handleSubmit = (e)=>{
        e.preventDefault();
        if(amount === ""){
        alert("please enter amount");
        }else{
          var options = {
            key: "rzp_test_GjVOE8EYvvUBod",
            key_secret:"v2WvLhZ2aXIUDjPjavzthoIH",
            amount: amount *100,
            currency:"INR",
            name:"Gifty",
            description:"for testing purpose",
            handler: function(response){
              alert(response.razorpay_payment_id);
            },
            prefill: {
              name:"herald",
              email:"ivanheraldd@gmail.com",
              contact:"xxxxxxxx"
            },
            notes:{
              address:"Razorpay "
            },
            theme: {
              color:"#3399cc"
            }
          };
          var pay = new window.Razorpay(options);
          pay.open();
        }
      }

  return (
    <div>
      <Header/>
    
    <div className="user-details-container">
      <Stepper alternativeLabel orientation='vertical' >
        <Step>
          <StepLabel> <div>
            Email<br />
            <TextField value={currentemail}  />
          </div></StepLabel>
        </Step>
        <Step>
          <StepLabel><div className='rental address'>
            <Button variant="contained" startIcon={<AddIcon />} onClick={DisplayAddress} sx={{backgroundColor:"black",color:"#cbb26a"}}>
              Add Address
            </Button>
            <br/>
            {showAddress && (
              <form  className='form_container'>
                <Card sx={{width:"480px",height:"520px"}}><br/>
                <TextField
                  label="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  required
                />&nbsp;&nbsp;
                <TextField
                  label="10-digit Mobile number"
                  variant="outlined" value={MobileNo} onChange={(e) => setMobileNo(e.target.value)}
                  required
                /><br /><br/>
                <TextField
                  label="Pincode"
                  variant="outlined"
                  value={Pincode} onChange={(e) => setPincode(e.target.value)}
                  required
                />&nbsp;&nbsp;
                <TextField variant='outlined' value={Locality1} onChange={(e) => setLocality1(e.target.value)} label="Landmark"/>
                <br /><br/>
                <TextField
                  label="Address(Area and street)" value={Address1} onChange={(e) => setAddress1(e.target.value)}
                  variant="outlined"
                  required multiline rows={4} sx={{ width: '418px' }}

                /><br /><br/>
                <TextField
                  label="City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  required

                />&nbsp;&nbsp;
                <TextField
                  label="State"
                  variant="outlined"
                  required
                  value={state}
                  onChange={(e) => setstate(e.target.value)}

                /><br /><br/>
                <TextField
                  label="Landmark(Optional)"
                  variant="outlined"
                  value={Landmark} onChange={(e) => setLandmark(e.target.value)}

                />&nbsp;&nbsp;
                <TextField
                  label="Alternate Phone(Optional)"
                  variant="outlined"
                  value={AlternatePhoneno} onChange={(e) => setAlternatephoneno(e.target.value)}

                /><br /><br/>
                
                <Button type="submit" variant="contained" color="primary" onClick={storeDetails} sx={{backgroundColor:"black",color:"#cbb26a"}}>
                  SAVE AND DELIVER HERE
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant='outlined' sx={{backgroundColor:"black",color:"#cbb26a"}}>CANCEL</Button>
                </Card>
              </form>
            )}
          </div></StepLabel>
        </Step>
      </Stepper>
      

      <div>



        <div className='payment options'>

          <div> <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
              <Typography>UPI</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup value={selectedValue} onChange={handleChange}>
                <FormControlLabel value="option1" control={<Radio />} label="PhonePe" />
                <FormControlLabel value="option2" control={<Radio />} label="Your UPI ID" />

              </RadioGroup>
            </AccordionDetails>
          </Accordion></div>
          <div>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
                <Typography>Credit/Debit/ ATM Card</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField variant='outlined' label='Enter Card Number'></TextField><br /><br/>
                <TextField variant='outlined' label='MM/YY' /><br/>
                <input type="text"placeholder='Enter Amount'value={amount}onChange={(e)=>setamount(e.target.value)} /><br/>
                <Button variant='outlined' onClick={handleSubmit} sx={{backgroundColor:"black",color:"#cbb26a"}}>PAY</Button>
              </AccordionDetails>
            </Accordion>
          </div>

        </div>
      </div>

    </div>
    </div>

  );

};

export default UserDetails;
