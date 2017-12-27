import React, { Component } from "react";
import "./App.css";
import Navbar from "../Navbar";
import Slider from "../Slider";
import ItemList from "../ItemList";

class App extends Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.state = {
      user: {}
    };
  }

  authenticate = response => {
    this.setState({
      user: response
    });
  };

  render() {
    const images = [
      {
        src:
          "http://imagetouristsites.com/wp-content/uploads/2017/12/sanibel-hotels-deals-best-of-island-inn-updated-2017-prices-amp-resort-reviews-sanibel-island-of-sanibel-hotels-deals.jpg",
        name: "nice pic"
      },
      {
        src: "http://www.hotel-discount.com/wp-content/uploads/Honolulu2.jpg",
        name: "rly nice pic"
      },
      {
        src: "http://www.theeurope.com/files/images/new/581c5603ec62.jpg",
        name: "rly nice pic2"
      }
    ];

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

    return (
      <div className="App">
        <Navbar
          authenticate={this.authenticate}
          user={this.state.user.name ? this.state.user : null}
        />
        <Slider images={images} />
        <ItemList items={items} />
      </div>
    );
  }
}

export default App;
