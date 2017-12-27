import React from "react";
import SliderSlick from "react-slick";
import "./slider.css";

export default ({ images }) => {
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true
  };
  return (
    <SliderSlick {...settings}>
      {images.map((img, index) => (
        <img className="slider-img" key={index} src={img.src} alt={img.name} />
      ))}
    </SliderSlick>
  );
};
