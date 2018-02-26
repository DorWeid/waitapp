import React from "react";
import Item from "../Item";
import "./itemlist.css";

export default props => {
  const { items } = props;
  console.log('items', items)
  return (
    <div className="item-list">
      {items.map(item => <Item key={item._id} {...item} />)}
    </div>
  );
};
