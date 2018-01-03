import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import classnames from 'classnames';
import "./index.css";
import AddListForm from "../AddListForm";

const TABS = [
  { name: "My Lists", icon: "fa-th-list", render: () => (<div>Nothing yet</div>) },
  { name: "Create New List", icon: "fa-plus-square", render: () => (<AddListForm />) }  
];

class UserLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 1
    };
  }

  changeTab(tabKey) {
    this.setState({
      currentTab: tabKey
    });
  }

  render() {
    const { match: { params: { user: name } } } = this.props;
    return (
      <div>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{name}'s lists</h1>
              <h2 className="subtitle">You can find your lists here!</h2>
            </div>
          </div>
        </section>
        <div className="tabs is-centered is-medium">
          <ul className="tab-list">
            {TABS.map((tab, key) => (
              <li
                className={classnames({'is-active': this.state.currentTab === key})                
                }
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
        <div>{TABS[this.state.currentTab].render()}</div>
      </div>
    );
  }
}

export default inject("store")(observer(UserLists));
