import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navbar.css";
import wait from "./wait.svg";
import FacebookLogin from "react-facebook-login";

const Avatar = ({ name, pic }) => (
  <div>
    <figure>
      <img src={pic.data.url} alt={name} className="avatar-pic" />
    </figure>
    <span className="avatar-text">Hi, {name}</span>
  </div>
);

const menuItems = ["Home", "Lists", "About"];

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  responseFacebook = response => {
    debugger;
    this.props.authenticate(response);
  };
  render() {
    const { user } = this.props;

    return (
      <div>
        <div className="navbar-overlay" />
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
            <h1 className="title is-4">w8</h1>
          </div>
          <div className="navbar-custom-menu">
            {menuItems.map(item => (
              <a key={item} className="navbar-custom-menuitem">
                <b>{item}</b>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticate: PropTypes.func
};

export default Navbar;
