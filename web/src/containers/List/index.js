import React, { Component } from "react";
import WaitingList from "../../components/WaitingList";
import SliderSlick from "react-slick";
import { observer, inject } from "mobx-react";
import {Redirect} from "react-router";
import img from "../../pictures/1.jpeg";
import './index.css';

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
  constructor(props) {
    super(props);

    this.enroll = this.enroll.bind(this);
    this.disenroll = this.disenroll.bind(this);
    this.accept = this.accept.bind(this);
    this.deny = this.deny.bind(this);
  }
  componentDidMount() {
    const { match } = this.props;
    const itemStore = this.props.store.itemStore;

    itemStore.getItem(match.params.id);
  }

  async enroll() {
    const { match: { params }, store: { itemStore, userStore } } = this.props;
    // TODO: enable only if user is logged in
    if (userStore.isUserLoggedIn) {
      await itemStore.items.get(params.id).enroll(userStore.currentUser.username);
      await itemStore.getItem(params.id);
    }

  }

  async disenroll() {
    const { match: { params }, store: { itemStore, userStore } } = this.props;
    // TODO: enable only if user is logged in
    if (userStore.isUserLoggedIn) {
      await itemStore.items.get(params.id).disenroll(userStore.currentUser.username);
      await itemStore.getItem(params.id)
    }
  }

  async accept() {
    const { match: { params }, store: { userStore: {currentUser}, itemStore } } = this.props;
    await currentUser.acceptList(params.id);
    await itemStore.getItem(params.id);
  }

  async deny() {
    const { match: { params }, store: { userStore: {currentUser}, itemStore } } = this.props;
    await currentUser.denyList(params.id);
    await itemStore.getItem(params.id);
  }

  render() {
    const { store: { itemStore: { items }, userStore: {currentUser} } } = this.props;
    const currentItem = items.get(this.props.match.params.id);
    // TODO: Loading indicator here plis
    if (!currentItem) {
      return <div>Loading ...</div>;
    }

    const { title, description, price, currency = "$", users = [] , status } =
      currentItem || {};
    let isSigned = users.includes(currentUser._id);
    if ((status === "pending" && (!currentUser || !currentUser.admin)) || status === 'deny') {
      return <Redirect to="/" />
    }

    return (
      <div style={{ marginTop: 100, zIndex: 15, position: "relative" }}>
        <div className="columns" style={{ paddingBottom: 30 }}>
          <div className="column">
            <h1 className="title is-1">{title}</h1>
            <h6 className="subtitle is-6">{description}</h6>
          </div>
        </div>
        <div className="columns" style={{ marginLeft: 15 }}>
          <div className="column is-2">
            <WaitingList users={users}/>
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
              </div>
              <hr />
              <div>
                <span className="icon is-small">
                  <i className="fa fa-percent" />
                </span>
                <br />
                <div className="title is-6">90% DISCOUNT</div>
              </div>
              <hr />
              <div>
                <span className="icon is-small">
                  <i className="fa fa-users" />
                </span>
                <br />
                <div className="title is-6">{users.length} WAITING</div>
              </div>
              <hr />
              <div>
                <span className="icon is-small">
                  <i className="fas fa-clock" />
                </span>
                <br />
                <div className="title is-6">LIMITED TIME OFFER!</div>
              </div>
              <hr />
              {
                status === "pending" ? (
                  <span className="admin-buttons">
                    <a className="button is-primary" onClick={this.accept}>
                        <span className="icon is-small">
                          <i className="fa fa-times" />
                        </span>
                        <span>Accept List</span>
                      </a>
                      <a className="button is-danger" onClick={this.deny}>
                      <span className="icon is-small">
                        <i className="fa fa-times" />
                      </span>
                      <span>Deny List</span>
                    </a>
                </span>
                ) :
                status === 'done' ? (<span>This list as already ended!</span>) :
                isSigned ? (
                <a className="button is-danger" onClick={this.disenroll}>
                  <span className="icon is-small">
                    <i className="fa fa-times" />
                  </span>
                  <span>Disenroll</span>
                </a>
              ) : (
                <a className="button is-primary" onClick={this.enroll}>
                  <span className="icon is-small">
                    <i className="fa fa-check" />
                  </span>
                  <span>Enroll now !</span>
                </a>
              )}
            </div>
          </div>
          <div className="column is-5 is-offset-1">
            <SliderSlick {...settings}>
              {slides.map((item, index) => (
                <img
                  key={index /* TODO: item.src should be the key*/}
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
