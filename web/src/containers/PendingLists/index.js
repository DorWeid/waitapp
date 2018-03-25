import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router";
import ItemList from "../../components/ItemList";
import './index.css';

class PendingLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingLists: []
    };
  }
  async componentDidMount() {
    const { store: { userStore } } = this.props;
    if (userStore.currentUser.admin) {
        const response  = await fetch('/api/admin/list/pending',  {
          credentials: "include"
        });
        const pendingLists = await response.json();
        this.setState({pendingLists});
    }
  }

  render() {
    const { store: { userStore } } = this.props;
    if (!userStore.currentUser.admin) {
      return <Redirect to="/" />;
    }
    return (
      <div className="lists-container">
        <ItemList items={this.state.pendingLists} />
      </div>
    );
  }
}

export default inject("store")(observer(PendingLists));
