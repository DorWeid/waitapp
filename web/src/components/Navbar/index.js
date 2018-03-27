import "react-awesome-popover/dest/react-awesome-popover.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CategoryPopUp from "../CategoryPopUp";
import UserAvatar from "../UserAvatar";
import { observer, inject } from "mobx-react";
import FacebookLogin from "react-facebook-login";
import Popover from "react-awesome-popover";
import "./navbar.css";

const menuItems = [
  { text: "Home", link: "/" },
  { text: "Lists", link: "/lists" },
  { text: "About", link: "/about" }
];

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };

    this.responseFacebook = this.responseFacebook.bind(this);

    if (!process.env.REACT_APP_FACEBOOK_ID) {
      console.error(
        "Missing REACT_APP_FACEBOOK_ID env variable. Facebook auth will not work!"
      );
    }
  }

  componentDidMount() {}

  responseFacebook = response => {
    const { userStore } = this.props.store;
    userStore.authenticateCurrentUser({
      accessToken: response.accessToken
    });
  };

  // NOTE: much arab
  isHomepage = () => {
    return document.location.pathname === "/";
  };

  render() {
    const { userStore } = this.props.store;

    return (
      <div>
        <div
          className={this.isHomepage() ? "navbar-overlay" : "navbar-background"}
        />
        <div className="navbar-custom">
          <div className="navbar-search">
            <span className="icon" style={{ color: "white" }}>
              <i className="fa fa-search" style={{ fontSize: 16 }} />
            </span>
            <input
              className="navbar-searchfield"
              type="text"
              placeholder="Search something..."
            />
          </div>
          <div className="navbar-logo">
            <h1 className="title is-4">
              <Link to="/" style={{ color: "inherit" }}>
                w8
              </Link>
            </h1>
          </div>
          <div className="navbar-custom-menu">
            {menuItems.map(item => (
              <Link
                key={item.text}
                className="navbar-custom-menuitem"
                to={item.link}
              >
                {item.text}
              </Link>
            ))}
            <div className="navbar-custom-menuitem">
              <Popover>
                Categories
                <CategoryPopUp />
              </Popover>
            </div>
            {userStore.currentUser.admin ? (
              <Link to="/pendingLists">
                <div className="navbar-custom-menuitem">Pending Lists</div>
              </Link>
            ) : null}
            {userStore.isUserLoggedIn ? (
              <Link to={`/${userStore.currentUser._id}/profile`}>
                <UserAvatar {...userStore.currentUser} />
              </Link>
            ) : (
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_ID}
                fields="name,email,picture.width(300).height(300)"
                callback={this.responseFacebook}
                cssClass="auth-button"
                cookie
                icon={<i className="fas fa-facebook" />}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticate: PropTypes.func
};

export default inject("store")(observer(Navbar));
