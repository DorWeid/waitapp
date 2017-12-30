import React from "react";
import Item from "../Item";
import "./itemlist.css";



const items = [
  {
    name: "Zimmer in Holon",
    img: "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg",
    description: "Ahlen zimmer in holon",
    price: 550,
    currency: "usd",
    location: "Holon"
  },
  {
    name: "What is Holon",
    img: "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg",
    description: "Ahlen zimmer in holon",
    price: 550,
    currency: "usd",
    location: "Holon"
  },
  {
    name: "FUN in Holon",
    img:
      "http://www.nofshim.co.il/images/site_images1903X735/ezel_nano.jpg",
    description: "Ahlen zimmer in holon",
    price: 550,
    currency: "usd",
    location: "Holon"
  },
  {
    name: "Zimmer in Acient Holon",
    img:
      "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
    description: "Ahlen zimmer in Acient Holon",
    price: 650,
    currency: "ils",
    location: "Acient Holon"
  }
];

export default () => (
  <div className="item-list">
    {items.map(item => <Item key={item.name} {...item} />)}
  </div>
);
