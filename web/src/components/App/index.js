import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.state = {
      user: {}
    }
  }

  authenticate = (response) => {
    this.setState({
      user: response
    });
  }

  render() {
    return (
      <div className="App">  
        <Navbar authenticate={this.authenticate} user={this.state.user.name ? this.state.user : null} />
      </div>
    );
  }
}

export default App;
