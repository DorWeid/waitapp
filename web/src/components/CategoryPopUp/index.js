import React from "react";
import img from "../../pictures/1.jpeg";
import "./CategoryPopUp.css";

export default class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          {/* <button onClick={this.props.closePopup}>close me</button> */}
          <a href="/lists">
            <img
              className="category_image"
              src={img}
              alt="thisShouldDefineEachCategoryWhenMapped"
            />
          </a>
        </div>
      </div>
    );
  }
}
