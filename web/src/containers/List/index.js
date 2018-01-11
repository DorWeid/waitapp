import React, { Component } from "react";
import WaitingList from "../../components/WaitingList";
import SliderSlick from "react-slick";
import { observer, inject } from "mobx-react";
import img from "../../pictures/1.jpeg";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true
};

const slides = [
  {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description:
      "description description description description description description description description description description description",
    title: "Sheraton Suite"
  },
  {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description:
      "description description description description description description description description description description description",
    title: "Sheraton Suite"
  },
  {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description:
      "description description description description description description description description description description description",
    title: "Sheraton Suite"
  },
  {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description:
      "description description description description description description description description description description description",
    title: "Sheraton Suite"
  }
];

class List extends Component {
  componentDidMount() {
    const { match } = this.props;
    const itemStore = this.props.store.itemStore;

    itemStore.getItem(match.params.id);
  }

  render() {
    const { store: { itemStore: { items } } } = this.props;
    const {
      name,
      description,
      price,
      originalPrice,
      discountInPercentage,
      currency
    } =
      items.get("1") || {};

    return (
      <div style={{ paddingTop: 100, zIndex: 15, position: "relative" }}>
        <div className="columns" style={{ paddingBottom: 30 }}>
          <div className="column">
            <h1 className="title is-1">{name}</h1>
            <h6 className="subtitle is-6">{description}</h6>
          </div>
        </div>
        <div className="columns" style={{ marginLeft: 15 }}>
          <div className="column is-2">
            <WaitingList />
          </div>
          <div className="column is-3" style={{ marginLeft: 40 }}>
            <div className="box">
              <h3 className="title is-4" style={{ marginBottom: 0 }}>
                ASKING PRICE:
              </h3>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  marginBottom: 0
                }}
              >
                <h2 className="title is-2" style={{ paddingRight: 10 }}>
                  {price}
                  {currency}
                </h2>
                <text>
                  <del>{originalPrice}</del>
                  {currency}
                </text>
              </div>
              <hr />
              <div>
                <span class="icon is-small">
                  <i class="fa fa-percent" />
                </span>
                <br />
                <text className="title is-6">
                  {discountInPercentage}% DISCOUNT
                </text>
              </div>
              <hr />
              <div>
                <span class="icon is-small">
                  <i class="fa fa-users" />
                </span>
                <br />
                <text className="title is-6">90+ WAITING</text>
              </div>
              <hr />
              <div>
                <span class="icon is-small">
                  <i class="fa fa-clock-o" />
                </span>
                <br />
                <text className="title is-6">LIMITED TIME OFFER!</text>
              </div>
              <hr />
              <a class="button is-primary">
                <span class="icon is-small">
                  <i class="fa fa-check" />
                </span>
                <span>Sign up now !</span>
              </a>
            </div>
          </div>
          <div className="column is-5 is-offset-1">
            <SliderSlick {...settings}>
              {slides.map(item => (
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ border: "2px solid white" }}
                />
              ))}
            </SliderSlick>
          </div>
        </div>
      </div>
    );
  }
}

export default inject("store")(observer(List));
