import React from "react";
import SliderSlick from "react-slick";
import img from "../../pictures/1.jpeg";
import "./slider.css";

export default () => {
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
      <img src={img} alt="hotel" />
    </SliderSlick>
  );
};
