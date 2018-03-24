import React from "react";
import { observer, inject } from "mobx-react";
import Cards from "react-credit-cards";
import "./UserProfile.css";

// Needed for credit-card component
import "react-credit-cards/es/styles-compiled.css";

class UserProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focused: ""
    };
  }

  componentDidMount() {
    const { match, store: { userStore } } = this.props;

    if (this.isCurrentUserProfile()) {
      userStore.getUser(match.params.userId);
    }
  }

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      this.setState({
        [target.name]: target.value.replace(/ /g, "")
      });
    } else if (target.name === "expiry") {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, "")
      });
    } else {
      this.setState({
        [target.name]: target.value
      });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  isCurrentUserProfile = () => {
    const { match, store: { userStore } } = this.props;

    return match.params.userId === userStore.currentUser._id;
  };

  updateUserCreditCard = () => {
    const { store: { userStore } } = this.props;

    userStore.currentUser.update({
      // TODO: Send input from state
    });

    this.setState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focused: ""
    });

    document.getElementById("credit-form").reset();
  };

  renderCurrentUserProfile = () => {
    const { store: { userStore } } = this.props;
    const { name, number, expiry, cvc, focused } = this.state;

    return (
      <div className="profile-bg">
        <h1 className="title is-1 profile-title">
          {userStore.currentUser.username}
        </h1>
        <img
          src={userStore.currentUser.picUrl}
          alt={userStore.currentUser.username}
          className="image is-96x96 profile-user-img"
        />
        <section className="section profile-bottom">
          <div className="profile-credit">
            <h4 className="title is-5">Add Credit Card Details</h4>
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
            />
            <form
              id="credit-form"
              className="add-list-form"
              style={{ margin: 20 }}
            >
              <div>
                <input
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <div>E.g.: 49..., 51..., 36..., 37...</div>
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="expiry"
                  placeholder="Valid Thru"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <input
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </form>
            <a
              className="button submit-btn"
              onClick={this.updateUserCreditCard}
            >
              Submit
            </a>
          </div>
        </section>
      </div>
    );
  };

  renderRandomUserProfile = () => {
    const { match, store: { userStore } } = this.props;
    const randomUserObject = userStore.users.get(match.params.userId);

    // If user has not been loaded yet or not found...
    if (!randomUserObject) {
      return (
        <div style={{ position: "absolute", top: 200, left: 0, right: 0 }}>
          <h1 className="title is-1">User not found!</h1>
        </div>
      );
    }

    return (
      <div className="profile-bg">
        <h1 className="title is-1 profile-title">
          {randomUserObject.username}
        </h1>
        <img
          src={randomUserObject.picUrl}
          alt={randomUserObject.username}
          className="image is-96x96 profile-user-img"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 50
          }}
        >
          <div style={{ width: "50%", borderRight: "1px solid #000" }}>
            <h4 className="title is-4">
              <u>Lists</u>
            </h4>
          </div>
          <div style={{ width: "50%" }}>
            <h4 className="title is-4">
              <u>Comments</u>
            </h4>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return !this.isCurrentUserProfile()
      ? this.renderCurrentUserProfile()
      : this.renderRandomUserProfile();
  }
}

export default inject("store")(observer(UserProfile));
