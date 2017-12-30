import React from "react";
import SliderSlick from "react-slick";
import "./slider.css";

export default () => {
  const images = [
    {
      src:
        "http://imagetouristsites.com/wp-content/uploads/2017/12/sanibel-hotels-deals-best-of-island-inn-updated-2017-prices-amp-resort-reviews-sanibel-island-of-sanibel-hotels-deals.jpg",
      name: "nice pic"
    },
    {
      src: "http://www.hotel-discount.com/wp-content/uploads/Honolulu2.jpg",
      name: "rly nice pic"
    },
    {
      src: "http://www.theeurope.com/files/images/new/581c5603ec62.jpg",
      name: "rly nice pic2"
    }
  ];    

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
