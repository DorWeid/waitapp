import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Item from "../../components/Item";
import "./lists.css";
//import classnames from "classnames";

// const items = [
//   {
//     name: "Zimmer in Holon",
//     img: "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg",
//     description: "Ahlen zimmer in holon",
//     price: 550,
//     currency: "usd",
//     location: "Holon"
//   },
//   {
//     name: "What is Holon",
//     img: "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg",
//     description: "Ahlen zimmer in holon",
//     price: 550,
//     currency: "usd",
//     location: "Holon"
//   },
//   {
//     name: "FUN in Holon",
//     img: "http://www.nofshim.co.il/images/site_images1903X735/ezel_nano.jpg",
//     description: "Ahlen zimmer in holon",
//     price: 550,
//     currency: "usd",
//     location: "Holon"
//   },
//   {
//     name: "Zimmer in Aciaent Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimsmer in Acient Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimmersin Acient Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimmer in Ascient Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimmer in Acient Holosn",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   }
// ];

class Lists extends Component {

  componentDidMount() {
    let {store: { itemStore } } = this.props;

    itemStore.loadItems();
    itemStore.loadCategories();
  }

  render() {
    let {store: { itemStore: {items = [], categories = []} } } = this.props;
    const size = 5;

    return (
      <div className="lists-container">
        {items.size !== 0  &&
          categories.map(category =>
            <div className="item-list-category" key={category.en}>
              <div className="item-list-category-title">
              {category.en} <Link className="item-list-category-subtitle" to={`/list/type/${category.en}`}>
                view all <span className="icon">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
              </div>
              <div className="item-list">{items.values().filter(item => item.type === category.en).slice(0, size).map(item => <Item key={item._id} {...item} />)}</div>
            </div>
          )
        }
      </div>
    );
  }
}

export default inject("store")(observer(Lists));
