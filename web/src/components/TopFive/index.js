import React, { Component } from "react";
import { observer } from "mobx-react";
import Item from "../../components/Item";
import "./topfive.css";

class TopFive extends Component {

  render() {
    let { items = [] } = this.props;

    return (
      <div className="topfive-container">
        {items.size !== 0 &&
          items.map(item =>
            <Item key={item._id} {...item} cardWidth="19%" />)
        }
      </div>
    );
  }
}

export default (observer(TopFive));
