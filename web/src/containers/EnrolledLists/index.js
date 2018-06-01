import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Redirect} from "react-router";
import ItemList from "../../components/ItemList";

class PendingLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enrolledLists: []
    };
  }
  async componentDidMount() {
    const {store: {
        userStore
      }} = this.props;
    if (userStore.isUserLoggedIn) {
      const response = await fetch(`/api/user/${userStore.currentUser._id}/lists`, {credentials: "include"});
      const enrolledLists = await response.json();
      this.setState({enrolledLists});
    }
  }

  render() {
    const {store: {
        userStore
      }} = this.props;
    if (!userStore.isUserLoggedIn) {
      return <Redirect to="/"/>;
    }
    return this.state.enrolledLists.length
      ? (
        <div className="lists-container">
          <ItemList items={this.state.enrolledLists}/>
        </div>
      )
      : <div style={{
        fontSize: 'large'
      }}>
        You haven't enrolled to any list yet!
      </div>
  }
}

export default inject("store")(observer(PendingLists));
