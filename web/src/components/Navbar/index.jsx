import React, { Component } from 'react';
import './navbar.css';
import wait from './wait.svg';
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar is-fixed-top">
          <div className="navbar-brand">
            <img src={wait} alt="waitapp logo" className="logo"/>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Home</a>
              <a className="navbar-item">About</a>
            </div>            
          </div>
      </nav>
    );
  }
}

export default Navbar;
