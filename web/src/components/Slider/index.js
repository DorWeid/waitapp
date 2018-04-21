import React from "react";
import {React_Bootstrap_Carousel as ReactBootstrapCarousel} from 'react-bootstrap-carousel';
import img2 from "../../pictures/4.jpg";
import img3 from "../../pictures/7.jpg";
import img4 from "../../pictures/6.jpg";
import { observer } from "mobx-react";
import "./slider.css";

const bootstrap_settings = {
  className:"carousel-fade",
  slideshowSpeed: 5000,
  wrap: true,
  indicators: false,
  defaultActiveIndex: 0,
}

const slides = [
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
      "Rent the perfect car for the perfect ride.",
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
      <img alt={alt} src={src} style={{ width: "100%", height: "100%", opacity: '0.6' }} />
      {
        <ItemDescriptionThumb {...props} />
      }
    </div>
  );
};

const Slider = (props) => {
  return <ReactBootstrapCarousel
    className="slider"
    {...bootstrap_settings}
    onSelect={props.changeCategory}
    autoplay={false}
  >
      {slides.map(Slide)}
    </ReactBootstrapCarousel>;
};

export default observer(Slider);
