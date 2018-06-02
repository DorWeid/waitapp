import React, {Component} from "react";
import WaitingList from "../../components/WaitingList";
import ItemList from "../../components/ItemList";
import SliderSlick from "react-slick";
import {observer, inject} from "mobx-react";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import img from "../../pictures/1.jpeg";
import moment from "moment";
import Modal from "react-responsive-modal";
import Dock from "react-dock";
import "react-responsive-modal/lib/react-responsive-modal.css";
import "./index.css";

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
    description: "description description description description description description descript" +
        "ion description description description description",
    title: "Sheraton Suite"
  }, {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description: "description description description description description description descript" +
        "ion description description description description",
    title: "Sheraton Suite"
  }, {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description: "description description description description description description descript" +
        "ion description description description description",
    title: "Sheraton Suite"
  }, {
    src: img,
    alt: "Sheraton Suite",
    id: "unique-id",
    description: "description description description description description description descript" +
        "ion description description description description",
    title: "Sheraton Suite"
  }
];

const errorCodes = {
  NOT_LOGGED_IN: 1,
  MISSING_CREDIT_CARD: 2,
  ENROLL_INFO: 3
};

class List extends Component {
  constructor(props) {
    super(props);

    this.enroll = this
      .enroll
      .bind(this);
    this.disenroll = this
      .disenroll
      .bind(this);
    this.accept = this
      .accept
      .bind(this);
    this.deny = this
      .deny
      .bind(this);
    this.redeem = this
      .redeem
      .bind(this);
    this.handleCloseModal = this
      .handleCloseModal
      .bind(this);
    this.handleOpenModal = this
      .handleOpenModal
      .bind(this);
    this.handleCloseEnrollModal = this
      .handleCloseEnrollModal
      .bind(this);
    this.onEnrollClick = this
      .onEnrollClick
      .bind(this);
    this.renderMeta = this
      .renderMeta
      .bind(this);

    // TODO: change the way we get the status and winner
    this.state = {
      modalOpen: false,
      winner: "not me",
      enrollModalOpen: false,
      errorCode: -1,
      similiar: []
    };
  }

  handleCloseEnrollModal() {
    this.setState({enrollModalOpen: false});
  }
  handleCloseModal() {
    this.setState({modalOpen: false});
  }

  handleOpenModal() {
    this.setState({modalOpen: true});
  }

  async componentDidMount() {
    const {
      match,
      store: {
        userStore,
        itemStore
      }
    } = this.props;

    itemStore.getItem(match.params.id);
    userStore
      .currentUser
      .getUserDetails();
    try {
      const response = await fetch(`/api/list/${match.params.id}/similiar`, {credentials: "include"});
      const similiar = await response.json();
      this.setState({similiar});
    } catch (error) {
      console.log("error fetching similar ", error);
    }
  }

  redeem() {
    alert("you motherfucker!");
  }

  renderEnrollingModalContent = () => {
    const {store: {
        userStore
      }} = this.props;
    switch (this.state.errorCode) {
      case errorCodes.NOT_LOGGED_IN:
        return <p>You must be logged in to enroll</p>;
      case errorCodes.MISSING_CREDIT_CARD:
        return (
          <div>
            <p>You must enter your credit card details before enrolling.</p>
            <p>
              You can do so by clicking{" "}
              <Link to={`/${userStore.currentUser._id}/profile`}>here</Link>
            </p>
          </div>
        );
      case errorCodes.ENROLL_INFO:
        return (
          <div>
            <p>
              When you enroll, a small fee will be charged.
              <b>However</b>, if you do not win, you will be refunded in full.
            </p>
            <br/>
            <p>Do you wish to continue ?</p>
            <br/>
            <div
              style={{
              display: "flex",
              justifyContent: "space-around"
            }}>
              <button className="button is-success is-large" onClick={this.enroll}>
                Yes
              </button>
              <button
                className="button is-danger is-large"
                onClick={this.handleCloseEnrollModal}>
                No
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  onEnrollClick() {
    const {store: {
        userStore
      }} = this.props;

    if (!userStore.isUserLoggedIn) {
      this.setState({errorCode: errorCodes.NOT_LOGGED_IN, enrollModalOpen: true});
      return;
    }

    if (!userStore.currentUser.doesUserHaveCreditCard) {
      this.setState({errorCode: errorCodes.MISSING_CREDIT_CARD, enrollModalOpen: true});
      return;
    }

    this.setState({errorCode: errorCodes.ENROLL_INFO, enrollModalOpen: true});
  }

  async enroll() {
    const {
      match: {
        params
      },
      store: {
        itemStore,
        userStore
      }
    } = this.props;
    this.handleCloseEnrollModal();
    await itemStore
      .items
      .get(params.id)
      .enroll(userStore.currentUser.username);
    await itemStore.getItem(params.id);
  }

  async disenroll() {
    const {
      match: {
        params
      },
      store: {
        itemStore,
        userStore
      }
    } = this.props;
    // TODO: enable only if user is logged in
    if (userStore.isUserLoggedIn) {
      await itemStore
        .items
        .get(params.id)
        .disenroll(userStore.currentUser.username);
      await itemStore.getItem(params.id);
    }
  }

  async accept() {
    const {
      match: {
        params
      },
      store: {
        userStore: {
          currentUser
        },
        itemStore
      }
    } = this.props;
    await currentUser.acceptList(params.id);
    await itemStore.getItem(params.id);
  }

  async deny() {
    const {
      match: {
        params
      },
      store: {
        userStore: {
          currentUser
        },
        itemStore
      }
    } = this.props;
    await currentUser.denyList(params.id);
    await itemStore.getItem(params.id);
  }

  renderMeta({
    type,
    meta = {}
  }) {
    switch (type) {
      case 'car':
        return (
          <tbody>
            {meta.carType && <tr>
              <td>
                <u>Car Type:</u>
              </td>
              <td>{meta.carType}</td>
            </tr>}
            {meta.seats && <tr>
              <td>
                <u>Seats:</u>
              </td>
              <td>{meta.seats}</td>
            </tr>}
            {meta.year && <tr>
              <td>
                <u>Year:</u>
              </td>
              <td>{meta.year}</td>
            </tr>}
          </tbody>
        );
      case 'flight':
        return (
          <tbody>
            {meta.airline && <tr>
              <td>
                <u>Airline:</u>
              </td>
              <td>{meta.airline}</td>
            </tr>}
            {meta.fromDestination && <tr>
              <td>
                <u>From:</u>
              </td>
              <td>{meta.fromDestination}</td>
            </tr>}
            {meta.toDestination && <tr>
              <td>
                <u>Airline:</u>
              </td>
              <td>{meta.toDestination}</td>
            </tr>}
          </tbody>
        );
      case 'hotel':
        return (
          <tbody>
            {meta.roomType && <tr>
              <td>
                <u>Room Type:</u>
              </td>
              <td>{meta.roomType}</td>
            </tr>}
            {meta.view && <tr>
              <td>
                <u>View:</u>
              </td>
              <td>{meta.view}</td>
            </tr>}
            {meta.stayingPlan && <tr>
              <td>
                <u>Staying Plan:</u>
              </td>
              <td>{meta.stayingPlan}</td>
            </tr>}
          </tbody>
        );
      default:
        return null;
    }
  }

  render() {
    const {
      store: {
        itemStore: {
          items
        },
        userStore: {
          currentUser
        }
      }
    } = this.props;
    const currentItem = items.get(this.props.match.params.id);
    // TODO: Loading indicator here plis
    if (!currentItem) {
      return <div>Loading ...</div>;
    }
    let timeLeftToReedem = moment().format("h:mm:ss");
    const {
      title,
      description,
      price,
      currency = "$",
      users = [],
      status,
      creatorName,
      creator,
      images = [],
      meta = {},
      type
    } = currentItem || {};
    let isSigned = users.includes(currentUser._id);
    const isWinner = status === "done" && this.state.winner === "me";
    if ((status === "pending" && (!currentUser || !currentUser.admin)) || status === "deny") {
      return <Redirect to="/"/>;
    }
    const imgs = images.length
      ? images
      : slides;
    return (
      <div
        style={{
        marginTop: 100,
        zIndex: 15,
        position: "relative"
      }}>
        <div className="columns" style={{
          paddingBottom: 30
        }}>
          <div className="column">
            <h1 className="title is-1">{title}</h1>
            <h3 className="subtitle is-3">{description}</h3>
            <h5 className="subtitle is-5">
              <Link to={`/${creator}/profile`}>List by - {creatorName}
              </Link>
            </h5>
          </div>
        </div>
        <div className="columns" style={{
          marginLeft: 15
        }}>
          <div className="column is-2">
            <WaitingList users={users.length}/>
            <div className="box">
              <h3 className="title is-3">Additional Info</h3>
              <table style={{
                width: '100%'
              }}>{this.renderMeta({
                  type,
                  meta: meta.toJSON()
                })}</table>
            </div>
          </div>
          <div className="column is-3" style={{
            marginLeft: 40
          }}>
            <div className="box">
              <h3
                className="title is-4"
                style={{
                marginBottom: 0
              }}>
                ASKING PRICE:
              </h3>
              <br/>
              <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                marginBottom: 0
              }}>
                <h2
                  className="title is-2"
                  style={{
                  paddingRight: 10
                }}>
                  {price}
                  {currency}
                </h2>
              </div>
              <hr/>
              <div>
                <span className="icon is-small">
                  <i className="fa fa-percent"/>
                </span>
                <br/>
                <div className="title is-6">90% DISCOUNT</div>
              </div>
              <hr/>
              <div>
                <span className="icon is-small">
                  <i className="fa fa-users"/>
                </span>
                <br/>
                <div className="title is-6">{users.length}
                  WAITING</div>
              </div>
              <hr/>
              <div>
                <span className="icon is-small">
                  <i className="fas fa-clock"/>
                </span>
                <br/>
                <div className="title is-6">LIMITED TIME OFFER!</div>
              </div>
              <hr/> {status === "pending"
                ? (
                  <span className="admin-buttons">
                    <a className="button is-primary" onClick={this.accept}>
                      <span className="icon is-small">
                        <i className="fa fa-check"/>
                      </span>
                      <span>Accept List</span>
                    </a>
                    <a className="button is-danger" onClick={this.deny}>
                      <span className="icon is-small">
                        <i className="fa fa-times"/>
                      </span>
                      <span>Deny List</span>
                    </a>
                  </span>
                )
                : !isWinner && status === "done"
                  ? (
                    <span>This list as already ended!</span>
                  )
                  : isWinner && status === "done"
                    ? (
                      <a className="button is-primary" onClick={this.redeem}>
                        <span className="icon is-small">
                          <i className="fa fa-times"/>
                        </span>
                        <span>Redeem your item!</span>
                      </a>
                    )
                    : isSigned
                      ? (
                        <a className="button is-danger" onClick={this.disenroll}>
                          <span className="icon is-small">
                            <i className="fa fa-times"/>
                          </span>
                          <span>Disenroll</span>
                        </a>
                      )
                      : (
                        <a className="button is-primary" onClick={this.onEnrollClick}>
                          <span className="icon is-small">
                            <i className="fa fa-check"/>
                          </span>
                          <span>Enroll now !</span>
                        </a>
                      )}
            </div>
          </div>
          <div className="column is-5 is-offset-1">
            <SliderSlick {...settings}>
              {imgs.map((item, index) => (<img
                key={index/* TODO: item.src should be the key*/}
                src={item.src}
                alt={item.alt}
                style={{
                border: "2px solid white"
              }}/>))}
            </SliderSlick>
          </div>
        </div>
        <Modal
          classNames={{
          modal: "modal-body"
        }}
          open={this.state.enrollModalOpen}
          onClose={this.handleCloseEnrollModal}
          little>
          <h2>Hey there!</h2>
          {this.renderEnrollingModalContent()}
        </Modal>
        <Modal
          classNames={{
          modal: "modal-body"
        }}
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          little>
          <h2>Congrats!</h2>
          <h4>You have won the list</h4>
          <p>{timeLeftToReedem}</p>
          <button
            className="button is-link"
            style={{
            fontSize: "medium"
          }}>
            Reedem
          </button>
        </Modal>
        <Dock
          position="bottom"
          isVisible={isWinner}
          fluid
          size={0.05}
          dimMode={"none"}
          dockStyle={{
          width: "20%",
          left: "0",
          right: "0",
          backgroundColor: "limegreen",
          fontSize: "1.5rem",
          margin: "auto"
        }}>
          <div style={{
            display: "flex"
          }}>
            <span className="dock-text">
              Total order is
              <strong>{price}</strong>
            </span>
          </div>
        </Dock>
        {Array.isArray(this.state.similiar) && <div>
          more like this:
          <ItemList
            items={this
            .state
            .similiar
            .slice(0, 5)}/>
        </div>}
      </div>
    );
  }
}

export default inject("store")(observer(List));
