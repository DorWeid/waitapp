import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import BigItem from "../../components/BigItem";
import ItemList from "../../components/ItemList";
import "./categoryLists.css";
import { Parallax } from 'react-parallax';
import Select from "react-select";
import moment from 'moment';
import DatePicker from 'react-datepicker';

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
      currentSort: "",
      filters: { start: null, end: null}
    };

    this.sortNew = this.sortNew.bind(this);
    this.sortPriceLowToHigh = this.sortPriceLowToHigh.bind(this);
    this.sortPriceHighToLow = this.sortPriceHighToLow.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
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

  handleStartDateChange(start) {
    this.setState({ filters: {...this.state.filters, start} });
  }

  handleEndDateChange(end) {
    this.setState({ filters: {...this.state.filters, end} });
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

  handleFilterChange(filter) {
    return condition => {
      switch (filter) {
        case 'price':
          this.setState({ filters: {...this.state.filters, price: condition ? condition.value : 999999}});
          break;
      
        case 'end':
          this.setState({ filters: {...this.state.filters, end: condition ? condition.value : 999999}});        
          break;
          
        default:
          break;
      }
    };
  }

  render() {
    const { store: { itemStore: { items } }, category } = this.props;

    const displayedItems = items
      .values()
      .sort(
        this.sortOptions.find(o => o.value === this.state.currentSort).func
      ).filter(itm => {
        const { price = 999999, start, end } = this.state.filters;
        
        if (price < itm.price) {
          return false;
        }

        if (end && moment(itm.startDate) > end) {
          return false;
        }

        if (start && moment(itm.startDate) < start) {
          return false;
        }

        return true;
      });

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
              <Select
                className="category-lists-select"
                value={this.state.filters.price}
                placeholder="Price lower than..."
                onChange={this.handleFilterChange('price')}
                options={[50,100,250,500,1000,2000,3000,9999].map(p => ({ value: p, label: `< ${p}₪` }))}
              />
              <DatePicker placeholderText={'From List Start Date'} onChange={this.handleStartDateChange} selected={this.state.filters.start} className="category-lists-date"/>
              <DatePicker placeholderText={'To List End Date'} onChange={this.handleEndDateChange} selected={this.state.filters.end} className="category-lists-date"/>
            </div>
        {displayedItems.length !== 0 ? (
          <div id="category-lists">
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
              <ItemList items={displayedItems.slice(1)} cardWidth="18%" />{" "}
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
