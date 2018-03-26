import React from "react";
import SliderSlick from "react-slick";
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';
import img from "../../pictures/1.jpeg";
import img2 from "../../pictures/4.jpg";
import img3 from "../../pictures/5.jpg";
import img4 from "../../pictures/6.jpg";
import "./slider.css";

const settings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: false,
  className: "slider"
};

const bootstrap_settings = {
  className:"carousel-fade",
  autoplay: true,
  slideshowSpeed: 3000,
  wrap: true,
  indicators: false,
  defaultActiveIndex: 1,
}

const slides = [
  {
    src: img,
    alt: "Hotels",
    id: "unique-id",
    description:
      "W8-App offers you your dream hotels at a bargain price. Find your home away from home.",
    title: "Hotels"
  },
  {
    src: img2,
    alt: "Hotels",
    id: "unique-id2",
    description:
      "Choose your next adventure. Make unforgettable memories.",
    title: "Hotels"
  },
  {
    src: img3,
    alt: "Cars",
    id: "unique-id3",
    description:
      "Don't miss it - Once a lifetime opportunities.",
    title: "Cars"
  },
  {
    src: img4,
    alt: "Flights",
    id: "unique-id4",
    description:
      "Hundreds of flights discounts at once.",
    title: "Flights"
  },
];

const ItemDescriptionThumb = props => {
  const { description, title } = props;
  return (
    <div className="slide-info">
      <h4 className="title slide-title">{title}</h4>
      <p className="slide-description">{description}</p>
    </div>
  );
};

const Slide = props => {
  const { src, alt, id } = props;
  return (
    <div key={id} style={{ width: "100vw", height: "100vh" }}>
      <img alt={alt} src={src} style={{ width: "100%", height: "100%" }} />
      <ItemDescriptionThumb {...props} />
    </div>
  );
};

// export default () => {
//   return <SliderSlick {...settings}>{slides.map(Slide)}</SliderSlick>;
// };

export default () => {
  return <React_Bootstrap_Carousel {...bootstrap_settings}>{slides.map(Slide)}</React_Bootstrap_Carousel>;
};