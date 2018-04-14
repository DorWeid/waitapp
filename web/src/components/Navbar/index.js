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
import SideNav from "react-simple-sidenav";

const menuItems = [
  { text: "Home", link: "/" },
  { text: "Lists", link: "/lists" },
  { text: "About", link: "/about" }
];

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      showNav: false
    };

    this.responseFacebook = this.responseFacebook.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    if (!process.env.REACT_APP_FACEBOOK_ID) {
      console.error(
        "Missing REACT_APP_FACEBOOK_ID env variable. Facebook auth will not work!"
      );
    }
  }

  componentDidMount() {}

  openSidebar(isOpen) {
    this.setState({ showNav: isOpen });
  }

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
    const items = [
      ...menuItems.map(item => (
        <Link key={item.text} to={item.link} className="navbar-custom-menuitem">
          {item.text}
        </Link>
      )),
      <Popover className="navbar-custom-menuitem">
        Categoriess
        <CategoryPopUp />
      </Popover>,
      userStore.currentUser.admin ? (
        <Link to="/pendingLists">
          <div className="navbar-custom-menuitem">Pending Lists</div>
        </Link>
      ) : null
    ];

    const title = userStore.isUserLoggedIn ? (
      <Link to={`/${userStore.currentUser._id}/profile`}>
        <div className="nav-title">
          <UserAvatar {...userStore.currentUser} />{" "}
          <span className="nav-title-text">
            Hey, {userStore.currentUser.username}
          </span>
        </div>
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
    );
    return (
      <div>
        <SideNav
          style={{ zIndex: 120 }}
          title={title}
          showNav={this.state.showNav}
          onHideNav={this.openSidebar.bind(this, false)}
          titleStyle={{ backgroundColor: "#4dd2e4e6", padding: "10px" }}
          itemStyle={{ backgroundColor: "#fff" }}
          itemHoverStyle={{ backgroundColor: "##3b5998" }}
          items={items}
        />
        <nav
          className={`navbar is-dark ${
            document.location.pathname === "/" ? "is-transparent" : ""
          } `}
        >
          <div className="navbar-start">
            <a
              className="navbar-item"
              onClick={this.openSidebar.bind(this, true)}
            >
              <i class="fas fa-bars" />
            </a>
          </div>
          <div className="navbar-brand navbar-logo">
            <Link to="/">w8</Link>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticate: PropTypes.func
};

export default inject("store")(observer(Navbar));
