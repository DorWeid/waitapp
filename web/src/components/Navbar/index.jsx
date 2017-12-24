import React, { Component } from 'react';
import './navbar.css';
import wait from './wait.svg';
import FacebookLogin from 'react-facebook-login';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
 responseFacebook = (response) => {
    console.log(response);
  }
  
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
            <div className="navbar-end">
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_ID}
              autoLoad
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            />
            </div>
          </div>
      </nav>
    );
  }
}

export default Navbar;
