import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar";
import UserLists from "../UserLists";
import Lists from "../../containers/Lists";
import List from "../../containers/List";
import AddList from "../../containers/AddList";
import PendingLists from "../../containers/PendingLists";
import EnrolledLists from "../../containers/EnrolledLists";
import CreatedLists from "../../containers/CreatedLists";
import UserProfile from "../../containers/UserProfile";
import CategoryLists from "../../containers/CategoryLists";
import HomePage from "../../containers/HomePage";
import { observer, inject } from "mobx-react";

class App extends Component {
  componentWillMount() {
    const { userStore } = this.props.store;

    // This is sync
    if (userStore.currentUser.isUserAuthenticated) {
      userStore.setUserAuthData();
    }
  }

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
                <HomePage />
              </React.Fragment>
            )}
          />
          <Route path="/:userId/lists" component={UserLists} />
          <Route path="/lists" component={Lists} />
          <Route path="/list/type/:type" component={CategoryLists} />
          <Route path="/list/:id" component={List} />
          <Route path="/pendingLists" component={PendingLists} />
          <Route path="/createdLists" component={CreatedLists} />
          <Route path="/enrolledLists" component={EnrolledLists} />
          <Route path="/:userId/addList" component={AddList} />
          <Route path="/:userId/profile" component={UserProfile} />
        </Switch>
      </div>
    );
  }
}

export default inject("store")(observer(App));
