import React,{useState} from 'react'
import Categoryicon from './categoryicon';
import gift_icon from './Images/logo_b.png';
import './styles/Header.css';
import { Button, IconButton } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import ReactSearchBox from "react-search-box";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from './AuthContext';
import SearchIcon from '@mui/icons-material/Search';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Header() {
  const history=useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {setsearchvalue}=useAuthValue();
  const [noGiftFound, setNoGiftFound] = useState(false);

  const myCart=()=>{
    let path='/Cart';
    history(path);
  
  }
  const closeNoGiftFoundPopup = () => {
    setNoGiftFound(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://gifty-backend2.onrender.com/gift/searchGift?name=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        if (data.Gift.length === 0) {
          // No gifts found, set the state
          setNoGiftFound(true);
          console.log("no found")
        } 
        else {
          setNoGiftFound(false);
          setsearchvalue(data.Gift);
          history("/searchresult");
        }
      }
      else if (response.status === 404) {
        // Handle 404 error here
        setNoGiftFound(true); // You can set an error state or display a message
        console.log("404  Found");
      } 
      else {
        // Handle errors here
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  return (
    <div>
<div className='second_header' >
        <div className='icon'>
            <img src={gift_icon} className='image_icon'/>
            <span className='title'>Gifty</span>
        </div>
        <div></div>
        <div className='custom_search_bar'>
        <input
        type="text"
        className="custom-search-input"
        placeholder="Search..."
        value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
      />
       <Button onClick={handleSearch}startIcon={<SearchIcon/>} sx={{color:"#cbb26a"}} >Search</Button>
        </div>
        <Button className="my_cart" sx={{color:"#cbb26a",borderColor:"#cbb26a"}}variant='outlined' startIcon={<ShoppingCartIcon sx={{color:"#cbb26a"}}/>} onClick={myCart}>My Cart</Button>
        </div>
        {noGiftFound && (
        <div className="no-gift-found-popup">
          <div className="no-gift-found-message">
            No gift found. Please try a different search.
          </div>
          <button className="close-button" onClick={closeNoGiftFoundPopup}>
            &#10006; {/* Close symbol (X) */}
          </button>
        </div>
      )}
    </div>
  )
}

export default Header