import "react-awesome-popover/dest/react-awesome-popover.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import { observer, inject } from "mobx-react";
import FacebookLogin from "react-facebook-login";
import "./navbar.css";
import SideNav from "react-simple-sidenav";

const menuItems = [
  { text: "Home", link: "/" },
  // { text: "Lists", link: "/lists" },
  { text: "About", link: "/about" }
];

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      showNav: false,
      categoriesActive: false
    };

    this.responseFacebook = this.responseFacebook.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);

    if (!process.env.REACT_APP_FACEBOOK_ID) {
      console.error(
        "Missing REACT_APP_FACEBOOK_ID env variable. Facebook auth will not work!"
      );
    }
  }

  openSidebar(isOpen) {
    this.setState({ showNav: isOpen });
  }

  responseFacebook = response => {
    const { userStore } = this.props.store;
    userStore.authenticateCurrentUser({
      accessToken: response.accessToken
    });
  };

  // TODO: Fix
  onCategorySelect(categoryNum) {
    const { itemStore: { categories = [], changeCurrentCategory } } = this.props.store;

    this.openSidebar.bind(this, false);
    changeCurrentCategory(categories[categoryNum]);
  }

  // NOTE: much arab
  isHomepage = () => {
    return document.location.pathname === "/";
  };

  render() {
    const { userStore } = this.props.store;

    const items = [
      ...menuItems.map(item => (
        <Link
          key={item.text}
          to={item.link}
          onClick={this.openSidebar.bind(this, false)}
          className="navbar-custom-menuitem"
        >
          {item.text}
        </Link>
      )),
      <div className="dropdown is-hoverable">
        <div
          className="dropdown-trigger navbar-custom-menuitem"
          style={{ display: "flex" }}
        >
          <span style={{ marginRight: "5px" }}>Categories</span>
          <span className="icon is-small" style={{ margin: "auto" }}>
            <i className="fas fa-angle-down" />
          </span>
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content">
            <Link
              to="/"
              onClick={this.openSidebar.bind(this, false)}
              className="dropdown-item navbar-custom-menuitem"
            >
              Hotels
            </Link>
            <Link
              to="/"
              onClick={this.openSidebar.bind(this, false)}
              className="dropdown-item navbar-custom-menuitem"
              replace
            >
              Cars
            </Link>
            <Link
              to="/"
              onClick={this.openSidebar.bind(this, false)}
              className="dropdown-item navbar-custom-menuitem"
            >
              Flights
            </Link>
          </div>
        </div>
      </div>,
      userStore.currentUser.admin ? (
        <Link to="/pendingLists">
          <div className="navbar-custom-menuitem">Pending Lists</div>
        </Link>
      ) : null,
      userStore.isUserLoggedIn ? (
        <Link to="/createdLists">
          <div className="navbar-custom-menuitem">Created Lists</div>
        </Link>
      ) : null,
      userStore.isUserLoggedIn ? (
        <Link to="/enrolledLists">
          <div className="navbar-custom-menuitem">Enrolled Lists</div>
        </Link>
      ) : null,
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
      <div className="nav-title">
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_ID}
          fields="name,email,picture.width(300).height(300)"
          callback={this.responseFacebook}
          cssClass="auth-button"
          cookie
          icon={<i className="fas fa-facebook" />}
        />
      </div>
    );
    return (
      <div>
        <SideNav
          style={{ zIndex: 120 }}
          title={title}
          showNav={this.state.showNav}
          onHideNav={this.openSidebar.bind(this, false)}
          titleStyle={{ backgroundColor: "black" }}
          itemStyle={{ backgroundColor: "#fff" }}
          itemHoverStyle={{ backgroundColor: "##3b5998" }}
          items={items}
        />
        <nav
          className={`navbar is-dark`}
        >
          <div className="navbar-start">
            <a
              className="navbar-item"
              onClick={this.openSidebar.bind(this, true)}
            >
              <i className="fas fa-bars" />
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
