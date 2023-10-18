import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from './Images/slide1.webp'
import slide2 from './Images/slide2.webp'
import slide3 from './Images/slide3.webp'
import slide4 from './Images/slide4.webp'

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        <div>
          <img src={slide1} alt="Image 1" />
        </div>
        <div>
          <img src={slide2} alt="Image 2" />
        </div>
        <div>
          <img src={slide3} alt="Image 3" />
        </div>
        <div>
            <img src={slide4} alt="Image 4"/>
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
