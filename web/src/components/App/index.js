import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar';
import Slider from '../Slider';

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
    const images = [
      { src: 'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAjkAAAAJDlhYjMzNTZiLTVjYzYtNGZhOC1hNTdlLTM0YWIyYjhiZWE0Zg.jpg', name: 'nice pic'},
      { src: 'http://www.hdwallpaperspulse.com/wp-content/uploads/2016/08/27/cute-cat-nice.jpg', name: 'rly nice pic'}    
    ];

    return (
      <div className="App">  
        <Navbar authenticate={this.authenticate} user={this.state.user.name ? this.state.user : null} />     
        <Slider images={images} />   
      </div>
    );
  }
}

export default App;
