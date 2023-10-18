import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';
import Header from './Header';
import { Button } from '@mui/material';
import { useAuthValue } from "./AuthContext";
import ImageSlider from './Slider';
import gift1 from './Images/gift1_image.webp'
import Bday from './Images/Bday.webp'
import anniversary from './Images/anniversary.webp'
import unique from './Images/unique.webp'
import flower from './Images/flowers.webp'
import him from './Images/him.webp'
import her from './Images/her.webp'
import addcartgif from './Images/addcartgif.gif'
import Footer from '../component/Footer'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function chunkArray(array, chunkSize) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const history=useNavigate();
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();
  const{currentemail} = useAuthValue();
  const [showPopup, setShowPopup] = useState(false);
  const {setsearchvalue}=useAuthValue();

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
    const response = await fetch('gift/addtocart', { 
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
  

  const fetchGifts = async () => {
    try {
      const response = await fetch('https://gifty-backend2.onrender.com/gift/getAllGift'); 

      if (response.status === 200) {
        const data = await response.json();
        setGifts(data.gift);
      } else {
        console.error('Failed to fetch gifts');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchGifts();
    console.log(currentemail);
  }, []);
  const handleCategory = async (categoryName) => {

    try {
      const response = await fetch(`https://gifty-backend2.onrender.com/gift/searchcategory?category=${categoryName}`);
      if (response.ok) {
        const data = await response.json();
        setsearchvalue(data.Gift);
        history("/searchresult")
        console.log(data);
      } else {
        // Handle errors here
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
 return(
      <div>
<Header/>
<div className='body_container'>
<ImageSlider/><br/><br/>
<div className='icon_div'>
  <div><a onClick={()=>handleCategory('sweet')}>
<img src={gift1} className='icon_image'/></a>
<span className='icon_text'>Diwali Gifts</span></div>
<div><a onClick={()=>handleCategory('Cakes')}><img src={Bday} className='icon_image'/></a>
<span className='icon_text'>Birthday</span></div>
<div><a onClick={()=>handleCategory('Flowers')}><img src={anniversary} className='icon_image'/></a>
<span className='icon_text'>Anniversary</span></div>
<div><a onClick={()=>handleCategory('unique')}><img src={unique} className='icon_image'/></a>
<span className='icon_text'>Unique Gifts</span></div>
<div><a onClick={()=>handleCategory('Flower')}><img src={flower} className='icon_image'/></a>
<span className='icon_text'>Flowers</span></div>
<div><a onClick={()=>handleCategory('Him')}><img src={him} className='icon_image'/></a>
<span className='icon_text'>For Him</span></div>
<div><a onClick={()=>handleCategory('Her')}><img src={her} className='icon_image'/></a>
<span className='icon_text'>For Her</span></div>



</div>
<br/><br/>
<div className='image_container'>
  
       <Carousel  showArrows={true}
  infiniteLoop={true}
  showThumbs={false}
  showStatus={false}
  dynamicHeight={false}
  emulateTouch={true}
  useKeyboardArrows={true}
  centerSlidePercentage={100/3} // Display 5 cards at a time
  selectedItem={0}>
        {chunkArray(gifts, 5).map((group, groupIndex) => (
    <div key={groupIndex}>
      {group.map((gift, index) => (
        <div key={index} className='display_buy'>
          <h3>Best Sellers</h3>
          <img className="image" src={gift.url} />
          {gift.name}
          <br />
          ₹{gift.price}
        </div>
      ))}
    </div>
  ))}</Carousel>
    </div>
    {showPopup && (
        <div className='popup'>
          <img src={addcartgif}/>
        </div>)}
        </div>
        <Footer/>
    </div>
  );
}

export default Home;