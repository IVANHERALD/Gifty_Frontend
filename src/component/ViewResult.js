import React,{useState} from 'react';
import Header from './Header';
import { useAuthValue } from './AuthContext';
import './styles/Cart.css'
import { Button } from '@mui/material';
import addcartgif from './Images/addcartgif.gif'
import Footer  from './Footer';

function ViewResult() {
  const{currentemail} = useAuthValue();
  const [showPopup, setShowPopup] = useState(false);
  const {setsearchvalue}=useAuthValue();
  const { searchvalue } = useAuthValue();
  const addcart=async(gift)=>{
    const id=gift._id;
  
    var count=1; 
    const email=currentemail;
    const cartData = {
      email,
      id,
      count,
      name:gift.name,
      category:gift.category,
      url:gift.url,
      price:gift.price
    };
  
    try {
      const response = await fetch('https://gifty-backend2.onrender.com/gift/addtocart', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });
  
      if (response.status === 201) {
        
        console.log('Item added to the cart successfully');
        setShowPopup(true);
          
          setTimeout(() => {
            setShowPopup(false);
          }, 10000);
        
      } else {
       
        console.error('Failed to add item to the cart');
      }
    } catch (error) { console.error('Error during adding to cart:', error);
  }
  };
 

  // Check if searchvalue exists
  if (!searchvalue || !Array.isArray(searchvalue)) {
    return (
      <div>
        <Header />
        <div>No search results found.</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='cart_items'>
      {searchvalue.map((result, index) => (
        <div key={index} className="cart_item">
          <img src={result.url} className='image' alt="Product" />
          <div>{result.name}</div>
          <div> ₹{result.price}</div><br/>
          <Button variant='outlined' onClick={()=>addcart(result)}>Add to cart</Button>
        </div>
      ))}
      </div>
      {showPopup && (
        <div className='popup'>
          <img src={addcartgif}/>
        </div>)}
        
    </div>
  );
}

export default ViewResult;
