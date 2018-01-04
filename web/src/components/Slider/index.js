import React from "react";
import SliderSlick from "react-slick";
import img from "../../pictures/1.jpeg";
import "./slider.css";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  pauseOnHover: true,
  className: "slider"
};

const slides = [
  {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description:
      "description description description description description description description description description description description",
    title: "Sheraton Suite"
  }
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
    <div key={id}>
      <img alt={alt} src={src} />
      <ItemDescriptionThumb {...props} />
    </div>
  );
};

export default () => {
  return (
    <SliderSlick {...settings}>
      <div style={{ height: "100%", width: "100%" }}>{slides.map(Slide)}</div>
    </SliderSlick>
  );
};
