import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar";
import Slider from "../Slider";
import UserLists from "../UserLists";
import Lists from "../../containers/Lists";
import List from "../../containers/List";
import AddList from "../../containers/AddList";

class App extends Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.state = {
      user: {}
    };
  }

  authenticate = response => {
    this.setState({
      user: response
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar
          authenticate={this.authenticate}
          user={this.state.user.name ? this.state.user : null}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <React.Fragment>
                <Slider />
              </React.Fragment>
            )}
          />
          <Route path="/:user/lists" component={UserLists} />
          <Route path="/lists" component={Lists} />
          <Route path="/list/:id" component={List} />
          <Route path="/:user/addList" component={AddList} />
        </Switch>
      </div>
    );
  }
}

export default App;
