import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router";
import ItemList from "../../components/ItemList";

class PendingLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdLists: []
    };
  }
  async componentDidMount() {
    const { store: { userStore } } = this.props;
    if (userStore.isUserLoggedIn) {
      const response = await fetch(`/api/user/${userStore.currentUser._id}/createdLists`, {
        credentials: "include"
      });
      debugger
      const createdLists = await response.json();
      this.setState({ createdLists });
    }
  }

  render() {
    const { store: { userStore } } = this.props;
    if (!userStore.isUserLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="lists-container">
        <ItemList items={this.state.createdLists} />
      </div>
    );
  }
}

export default inject("store")(observer(PendingLists));
