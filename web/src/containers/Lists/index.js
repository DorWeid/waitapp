import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import ItemList from "../../components/ItemList";
//import classnames from "classnames";
import "./Lists.css";

// const items = [
//   {
//     name: "Zimmer in Holon",
//     img: "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg",
//     description: "Ahlen zimmer in holon",
//     price: 550,
//     currency: "usd",
//     location: "Holon"
//   },
//   {
//     name: "What is Holon",
//     img: "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg",
//     description: "Ahlen zimmer in holon",
//     price: 550,
//     currency: "usd",
//     location: "Holon"
//   },
//   {
//     name: "FUN in Holon",
//     img: "http://www.nofshim.co.il/images/site_images1903X735/ezel_nano.jpg",
//     description: "Ahlen zimmer in holon",
//     price: 550,
//     currency: "usd",
//     location: "Holon"
//   },
//   {
//     name: "Zimmer in Aciaent Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimsmer in Acient Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimmersin Acient Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimmer in Ascient Holon",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   },
//   {
//     name: "Zimmer in Acient Holosn",
//     img:
//       "https://www.safarihotelsnamibia.com/wp-content/uploads/2014/11/Safari-Court-Hotel-Pool.jpg",
//     description: "Ahlen zimmer in Acient Holon",
//     price: 650,
//     currency: "ils",
//     location: "Acient Holon"
//   }
// ];

// const tabs = [
//   {
//     name: "Hotels",
//     icon: "fa-th-list",
//     render: () => <ItemList items={items} />
//   },
//   {
//     name: "Flights",
//     icon: "fa-th-list",
//     render: () => <div>Nothing yet</div>
//   },
//   {
//     name: "Zimmers",
//     icon: "fa-th-list",
//     render: () => <div>Nothing yet</div>
//   },
//   {
//     name: "Rentals",
//     icon: "fa-th-list",
//     render: () => <div>Nothing yet</div>
//   }
// ];

class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 1
    };    
  }

  componentDidMount() {
    let {store: { itemStore } } = this.props;
    itemStore.loadItems();
  }

  changeTab(tabKey) {
    this.setState({
      currentTab: tabKey
    });
  }

  render() {
    let {store: { itemStore } } = this.props;    
    return (
      <div className="lists-container">
        {/* <div className="tabs is-centered is-medium">
          <ul className="tab-list">
            {tabs.map((tab, key) => (
              <li
                className={classnames({
                  "is-active": this.state.currentTab === key
                })}
                key={tabs[key].name}
              >
                <a onClick={this.changeTab.bind(this, key)}>
                  <span className="icon is-small">
                    <i className={`fa ${tabs[key].icon}`} />
                  </span>
                  <span>{tabs[key].name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div> */}
        {/* <div>{tabs[this.state.currentTab].render()}</div> */}
        {itemStore.items.size !== 0  && <ItemList items={itemStore.items.values()} />}
      </div>
    );
  }
}

export default inject("store")(observer(Lists));
