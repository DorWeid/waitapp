import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import BigItem from "../../components/BigItem";
import ItemList from "../../components/ItemList";
import "./categoryLists.css";
import { Parallax } from 'react-parallax';
import Select from "react-select";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../../pictures/", false, /\.(png|jpe?g|svg)$/)
);

class CategoryLists extends Component {
  sortOptions = [
    { value: "", label: "Sort by", func: undefined },
    {
      value: "Price: low to high",
      label: "Price: low to high",
      func: this.sortPriceLowToHigh
    },
    {
      value: "Price: high to low",
      label: "Price: high to low",
      func: this.sortPriceHighToLow
    },
    { value: "New", label: "New", func: this.sortNew }
  ];

  constructor(props) {
    super(props);

    this.state = {
      currentSort: ""
    };

    this.sortNew = this.sortNew.bind(this);
    this.sortPriceLowToHigh = this.sortPriceLowToHigh.bind(this);
    this.sortPriceHighToLow = this.sortPriceHighToLow.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    let { store: { itemStore }, category } = this.props;
    itemStore.getListsOfCategory(category);
  }

  componentWillReceiveProps(nextProps) {
    let { store: { itemStore }, category } = this.props;

    if (nextProps.category !== category) {
      itemStore.getListsOfCategory(nextProps.category);
    }
  }

  sortNew(a, b) {
    return a.createdAt > b.createdAt;
  }

  sortPriceLowToHigh(a, b) {
    return parseInt(a.price, 10) > parseInt(b.price, 10);
  }

  sortPriceHighToLow(a, b) {
    return parseInt(a.price, 10) < parseInt(b.price, 10);
  }

  handleSortChange(option) {
    this.setState({ currentSort: option ? option.value : "" });
  }

  render() {
    const { store: { itemStore: { items } }, category } = this.props;

    const displayedItems = items
      .values()
      .sort(
        this.sortOptions.find(o => o.value === this.state.currentSort).func
      );

    return (
      <div className="category-lists-container">
        <Parallax
            blur={0}
            bgImage={images[`category_${category}.jpg`]}
            bgImageAlt="categoryImg"
            bgHeight={"95vh"}
            bgWidth={"100vw"}
            strength={500}
          >
            <div style={{ height: '35vh', width: '100vw' }} />
        </Parallax>
        {displayedItems.length !== 0 ? (
          <div id="category-lists">
            <div className="category-lists-header">
              <Select
                className="category-lists-select"
                value={this.state.currentSort}
                placeholder="Sort by"
                onChange={this.handleSortChange}
                options={this.sortOptions.map(o => ({
                  value: o.value,
                  label: o.label
                }))}
              />
            </div>
            <div className="category-lists-speacials-container">
              <div className="category-lists-specials-title">
                Don't miss our Specials:
              </div>
              <div className="category-lists-speacials">
                {displayedItems
                  .slice(0, 3)
                  .map(item => <BigItem key={item._id} {...item} />)}
              </div>
            </div>
            <br />
            <div style={{ width: "90%" }}>
              {" "}
              <ItemList items={displayedItems.slice(3)} cardWidth="18%" />{" "}
            </div>
          </div>
        ) : (
          <div id="category-lists">
            There are no lists of this category yet. B the first to create one!
          </div>
        )}
      </div>
    );
  }
}

export default inject("store")(observer(CategoryLists));
