import React, { Component } from "react";

class List extends Component {
  render() {
    const { match } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", width: "30%" }}>Col1</div>
          <div style={{ display: "flex", width: "30%" }}>Col1</div>
          <div style={{ display: "flex", width: "30%" }}>Col1</div>
        </div>
        <div style={{ overflow: "hidden", height: 600, width: "100%" }}>
          <img
            style={{ display: "block", width: "100%", margin: "-10% 0" }}
            src="http://imagetouristsites.com/wp-content/uploads/2017/12/sanibel-hotels-deals-best-of-island-inn-updated-2017-prices-amp-resort-reviews-sanibel-island-of-sanibel-hotels-deals.jpg"
            alt="Item"
          />
        </div>
      </div>
    );
  }
}

export default List;
