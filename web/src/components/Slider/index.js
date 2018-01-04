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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    title: "Sheraton Suite"
  }
];

const ItemDescriptionThumb = props => {
  const { description, title } = props;
  return (
    <div className="slide-info">
      <h4 className="title is-4">{title}</h4>
      <text className="slide-description">{description}</text>
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
