import React from "react";
import { observer } from "mobx-react";
import './slidericon.css';

const SliderIcon  = (props) => {
  return <div className={`slider-icon-${props.direction}`}>
    <div><p>{props.text}</p></div>
    <i className={`fas fa-angle-${props.direction} fa-2x`} />
  </div>;
};

export default observer(SliderIcon);
