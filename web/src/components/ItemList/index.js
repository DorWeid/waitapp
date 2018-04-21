import React from "react";
import Item from "../Item";
import "./itemlist.css";
export default props => {
  const { items = [], cardWidth } = props;
  return (
    <div className="item-list">
      {items.map(item => (
        <Item
          key={item._id}
          {...item}
          cardWidth={cardWidth}
          isOwner={props.isOwner}
        />
      ))}
    </div>
  );
};
