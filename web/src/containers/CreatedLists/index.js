import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Redirect} from "react-router";
import ItemList from "../../components/ItemList";

class PendingLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdLists: []
    };
  }
  async componentDidMount() {
    await this.loadlists();
  }

  loadlists = async() => {
    const {store: {
        userStore
      }} = this.props;
    if (userStore.isUserLoggedIn) {
      const response = await fetch(`/api/user/${userStore.currentUser._id}/createdLists`, {credentials: "include"});
      const createdLists = await response.json();
      this.setState({createdLists});
    }
  };

  startList = async id => {
    await fetch(`/api/list/${id}/start`, {
      credentials: "include",
      method: "POST"
    })

    await this.loadlists();
  };

  render() {
    const {store: {
        userStore
      }} = this.props;
    if (!userStore.isUserLoggedIn) {
      return <Redirect to="/"/>;
    }
    return this.state.createdLists.length
      ? (
        <div className="lists-container">
          <ItemList items={this.state.createdLists} isOwner startList={this.startList}/>
        </div>
      )
      : <div style={{
        fontSize: 'large'
      }}>
        You haven't created any list yet!
      </div>
  }
}

export default inject("store")(observer(PendingLists));
