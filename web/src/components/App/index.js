import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar";
import Slider from "../Slider";
import UserLists from "../UserLists";
import Lists from "../../containers/Lists";
import List from "../../containers/List";
import AddList from "../../containers/AddList";
import UserProfile from "../../containers/UserProfile";
import CategoryLists from "../../containers/CategoryLists";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
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
          <Route path="/:userId/lists" component={UserLists} />
          <Route path="/lists" component={Lists} />
          <Route path="/list/type/:type" component={CategoryLists} />
          <Route path="/list/:id" component={List} />
          <Route path="/:userId/addList" component={AddList} />
          <Route path="/:userId/profile" component={UserProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
