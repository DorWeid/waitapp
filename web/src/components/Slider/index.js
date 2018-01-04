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
    pauseOnHover: true,
    className: "slider"
  };
  return (
    <div style={{ maxHeight: "100%" }}>
      <SliderSlick {...settings}>
        <div style={{ height: "100%", width: "100%" }}>
          <img src={img} alt="hotel" />
        </div>
      </SliderSlick>
    </div>
  );
};
