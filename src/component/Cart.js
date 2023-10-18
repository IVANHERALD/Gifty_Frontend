import React,{useEffect,useState} from 'react'
import CartHeader from './CartHeader'
import { useAuthValue } from './AuthContext';
import './styles/Cart.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const history = useNavigate();
  const{currentemail}=useAuthValue();
  const {searchResults, setSearchResults} = useAuthValue();
  const handleuserDetails=()=>{
    history('/UserDetails')
  }
  
  const handleCart = async () => {
    try {
      const response = await fetch(`https://gifty-backend2.onrender.com/gift/giftsbyemail?email=${currentemail}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.Gift);
        console.log(data);
      } else {
        // Handle errors here
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  const incrementCount = async(gift) => {
    // Increment the count of the gift
    const updatedSearchResults = searchResults.map((item) =>
      item._id === gift._id
        ? { ...item, count:Math.min(10, parseInt(item.count )+ 1) }
        : item
    );

    // Update the state with the new searchResults
    setSearchResults(updatedSearchResults);
    try {
      const response = await fetch(`/gift/updateQuantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftId: gift._id,
          quantity: parseInt(gift.count) + 1,
        }),
      });
  
      if (response.ok) {
        console.log("updated successfully")
      } else {
        // Handle errors here
      }
    } catch (error) {
      console.error('Error updating quantity in the backend:', error);
    }

  }
  const decrementcount = (gift) => {
    // Increment the count of the gift
    const updatedSearchResults = searchResults.map((item) =>
      item._id === gift._id
        ? { ...item, count:Math.max(0, parseInt(item.count )-1) }
        : item
    );

    // Update the state with the new searchResults
    setSearchResults(updatedSearchResults);
  }
  useEffect(() => {
    handleCart();
    
  }, []);
  const cartItems = searchResults.filter((gift) => gift.count > 0);

  return (
    <div>
<CartHeader/>
<div className="cart_items">
        {cartItems.map((gift) => (
          <div key={gift._id} className="cart_item">
            <img src={gift.url} alt={gift.name} className='image'/>
            <h3>{gift.name}</h3>
            Price: ₹{gift.price}<br/>
            <div className='quantity_control'>
              <Button variant="outlined" onClick={()=>decrementcount(gift)}>
                -
              </Button>
              <span >{gift.count }</span>
              <Button variant="outlined" onClick={()=>incrementCount(gift)}>
                +
              </Button>
            </div>
            
          </div>))}
    </div>
    <Button variant='outlined' onClick={handleuserDetails} sx={{backgroundColor:"black",color:"#cbb26a",width:"190px"}}>Buy Now</Button>
    </div>
  )
}

export default Cart