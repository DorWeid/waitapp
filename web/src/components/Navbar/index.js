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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          zIndex: 10,
          top: 10,
          width: "100%"
        }}
      >
        <div
          style={{
            height: 300,
            backgroundColor: "white",
            position: "absolute",
            top: -10,
            zIndex: 11,
            width: "100%"
          }}
        />
        <div>
          <span className="icon" style={{ color: "white" }}>
            <i className="fa fa-search" style={{ fontSize: 16 }} />
          </span>
          <input
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              marginLeft: "10px"
            }}
            type="text"
            placeholder="Search something..."
          />
        </div>
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            height: 45,
            width: 45,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.75)"
          }}
        >
          <h1 className="title is-4 is-bold">
            <b>w8</b>
          </h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {menuItems.map(item => (
            <a style={{ fontSize: 18, color: "white", paddingRight: 20 }}>
              <b>{item}</b>
            </a>
          ))}
        </div>
      </div>
    );

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={wait} alt="waitapp logo" className="logo" />
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            {user && (
              <Link className="navbar-item" to={`/${user.name}/lists`}>
                My Lists
              </Link>
            )}
            <Link className="navbar-item" to="/about">
              About
            </Link>
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
