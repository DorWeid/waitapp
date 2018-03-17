import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CategoryPopUp from "../CategoryPopUp";
import "./navbar.css";
// import wait from "./wait.svg";
// import FacebookLogin from "react-facebook-login";

// const Avatar = ({ name, pic }) => (
//   <div>
//     <figure>
//       <img src={pic.data.url} alt={name} className="avatar-pic" />
//     </figure>
//     <span className="avatar-text">Hi, {name}</span>
//   </div>
// );

const menuItems = [
  { text: "Home", link: "/" },
  { text: "Lists", link: "/lists" },
  { text: "About", link: "/about" }
];

class Navbar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showPopup : false

    }
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  responseFacebook = response => {
    debugger;
    this.props.authenticate(response);
  };

  // NOTE: much arab
  isHomepage = () => {
    return document.location.pathname === "/";
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    // const { user } = this.props;

    return (
      <div>
        <div
          className={this.isHomepage() ? "navbar-overlay" : "navbar-background"}
        />
        <div className="navbar-custom">
          <div>
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
            <div className="navbar-custom-menuitem" onClick={this.togglePopup.bind(this)}>Categories</div>
          </div>
        </div>
        {this.state.showPopup && <CategoryPopUp closePopup={this.togglePopup.bind(this)}/>}
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticate: PropTypes.func
};

export default Navbar;
