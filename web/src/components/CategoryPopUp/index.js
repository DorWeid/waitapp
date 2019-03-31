import React from "react";
import img_hotel from "../../pictures/1.jpeg";
import img_car from "../../pictures/2.jpg";
import img_flight from "../../pictures/3.jpg";
import { Link } from "react-router-dom";
import "./CategoryPopUp.css";

export default class Popup extends React.Component {
  render() {
    return (
      <div className="popup_inner">
        <Link to={`/list/type/hotel`}>
          <img
            className="category_image"
            src={img_hotel}
            alt="thisShouldDefineEachCategoryWhenMapped"
          />
        </Link>
        <Link to={`/list/type/car`}>
          <img
            className="category_image"
            src={img_car}
            alt="thisShouldDefineEachCategoryWhenMapped"
          />
        </Link>
        <Link to={`/list/type/flight`}>
          <img
            className="category_image"
            src={img_flight}
            alt="thisShouldDefineEachCategoryWhenMapped"
          />
        </Link>
      </div>
    );
  }
}
