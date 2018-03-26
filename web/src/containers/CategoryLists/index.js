import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Item from "../../components/Item";
import ItemList from "../../components/ItemList";
import "./categoryLists.css";
import Select from 'react-select';
import scrollToElement from 'scroll-to-element';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../pictures/', false, /\.(png|jpe?g|svg)$/));

class CategoryLists extends Component {
  sortOptions = [
    {value: '', label: 'Sort by', func: undefined },
    {value: 'Price: low to high', label: 'Price: low to high', func: this.sortPriceLowToHigh},
    {value: 'Price: high to low', label: 'Price: high to low', func: this.sortPriceHighToLow},
    {value: 'New', label: 'New', func: this.sortNew},
  ]

  constructor(props) {
    super(props);

    this.state = {
      currentSort: '',
    };

    this.sortNew = this.sortNew.bind(this);
    this.sortPriceLowToHigh = this.sortPriceLowToHigh.bind(this);
    this.sortPriceHighToLow = this.sortPriceHighToLow.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    let {store: { itemStore }, match } = this.props;
    itemStore.getListsOfCategory(match.params.type);
  }

  componentWillReceiveProps(nextProps) {
    let {store: { itemStore }, match } = this.props;

    if (nextProps.match.params.type !== match.params.type) {
      itemStore.getListsOfCategory(nextProps.match.params.type);    
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
    this.setState({currentSort : option ? option.value : ''});
  }

  render() {
    const { store: { itemStore: { items } }, match } = this.props;

    const displayedItems = items.values().sort(this.sortOptions.find(o => o.value === this.state.currentSort).func);

    return (
      <div className="category-lists-container">
        <div>
          <img alt='categoryImg' src={images[`category_${match.params.type}.jpg`]} style={{ width: "100%", height: "90vh" }} />
        </div>
        <div className="arrow-icon-container" onClick={() => {scrollToElement(document.querySelector('#category-lists'));}}><i className="fas fa-arrow-circle-down"/></div>      
        {displayedItems.length !== 0 ?
          <div id="category-lists">
            <div className="category-lists-header">
              {/* <span className="category-lists-title"> {match.params.type} lists </span> */}
              <Select
                className="category-lists-select"
                value={this.state.currentSort}
                placeholder="Sort by"
                onChange={this.handleSortChange}
                options={this.sortOptions.map(o => ({ value: o.value, label: o.label }))}
              />
            </div>
            <div className="category-lists-speacials-container">
              <div className="category-lists-specials-title">Don't miss our Specials:</div>
              <div className="category-lists-speacials">
                {displayedItems.slice(0, 3).map(item => <Item key={item._id} {...item} />)}
              </div>              
            </div>
            <br />
            <div style={{ width: '90%' }}> <ItemList items={displayedItems.slice(1)} /> </div>
          </div>
          : <div id="category-lists">There are no lists of this category yet. B the first to create one!</div>
        }
      </div>
    );
  }
}

export default inject("store")(observer(CategoryLists));
