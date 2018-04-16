import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import ItemList from "../../components/ItemList";
import "./Lists.css";

class Lists extends Component {
  componentDidMount() {
    let { store: { itemStore } } = this.props;

    itemStore.loadItems();
    itemStore.loadCategories();
  }

  render() {
    let { store: { itemStore: { items = [], categories = [] } } } = this.props;
    const size = 5;

    return (
      <div className="lists-container">
        {items.size !== 0 &&
          categories.map(category => (
            <div className="item-list-category" key={category.en}>
              <div className="item-list-category-container">
                <Link
                  className="item-list-category-title"
                  to={`/list/type/${category.en}`}
                >
                  {category.en}
                </Link>
              </div>
              <ItemList
                items={items
                  .values()
                  .filter(item => item.type === category.en)
                  .slice(0, size)}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default inject("store")(observer(Lists));
