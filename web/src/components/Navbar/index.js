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
    const user = this.props.user;
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={wait} alt="waitapp logo" className="logo" />
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Home</a>
            <a className="navbar-item">
              <Link to="/about">About</Link>
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {user ? (
                <Avatar name={user.name} pic={user.picture} />
              ) : (
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_ID}
                  fields="name,email,picture.width(300).height(300)"
                  callback={this.responseFacebook}
                  cssClass="auth-button"
                  icon={<i className="fa fa-facebook" />}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  authenticate: PropTypes.func
};

export default Navbar;
