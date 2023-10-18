import React,{useState} from 'react'
import Categoryicon from './categoryicon';
import gift_icon from './Images/logo_b.png';
import './styles/CartHeader.css';
import { Button, IconButton } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import ReactSearchBox from "react-search-box";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from './AuthContext';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function CartHeader() {
  const history=useNavigate();
  return (
    <div>
        <div className='second_header' >
        <div className='icon'>
            <img src={gift_icon} className='image_icon'/>
            <span className='title'>Gifty</span>
        </div>
    </div>
    </div>
  )
}

export default CartHeader