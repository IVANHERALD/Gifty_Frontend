import gift_icon from './Images/logo_b.png';
import "./styles/Footer.css";
import footer_image from "./Images/footer_img.png";
import React from 'react';
import ReviewCarousel from './reviewCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import reviews from './reviewData'; // Import your review data
function Footer() {
return(
    
     <div className="footer"> 
      <div className="sub">
        <div className="image"><img id="footer-img" src={gift_icon} className="image_icon" alt="Gift Icon" /></div>
        <div className="text">
          <p className="footer_text">
            <ReviewCarousel reviews={reviews} />
          </p>
        </div>
      </div>
      <div className="footer-image"><img id="footer-img-1" src={footer_image} alt="Footer Image" /></div>
    </div>

);
}
export default Footer