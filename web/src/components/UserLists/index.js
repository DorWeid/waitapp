import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import classnames from "classnames";
import { Redirect } from "react-router";
import ItemList from "../ItemList";
import "./index.css";

const TABS = [
  {
    name: "My Lists",
    icon: "fa-th-list",
    render: ({ store: { userStore } }) => (
      <ItemList items={userStore.items.values()} />
    )
  },
  {
    name: "Create New List",
    icon: "fa-plus-square",
    render: ({ store: { userStore } }) => (
      <Redirect to={`/${userStore.currentUser.username}/addList`} />
    )
  }
];
class UserLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0
    };
  }

  componentDidMount() {
    let { store: { userStore } } = this.props;
    userStore.currentUser.getUserLists();
  }

  changeTab(tabKey) {
    this.setState({
      currentTab: tabKey
    });
  }

  render() {
    const { store: { userStore: { currentUser: user } } } = this.props;
    if (!user.username) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="user-lists-container">
          <section className="hero is-info">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">{`${user.username}'s lists`}</h1>
                <h2 className="subtitle">You can find your lists here!</h2>
              </div>
            </div>
          </section>
          <div className="tabs is-centered is-medium">
            <ul className="tab-list">
              {TABS.map((tab, key) => (
                <li
                  className={classnames({
                    "is-active": this.state.currentTab === key
                  })}
                  key={TABS[key].name}
                >
                  <a onClick={this.changeTab.bind(this, key)}>
                    <span className="icon is-small">
                      <i className={`fa ${TABS[key].icon}`} />
                    </span>
                    <span>{TABS[key].name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>{TABS[this.state.currentTab].render(this.props)}</div>
        </div>
      );
    }
  }
}

export default inject("store")(observer(UserLists));
