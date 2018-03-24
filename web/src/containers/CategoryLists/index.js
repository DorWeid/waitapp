import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Item from "../../components/Item";
import ItemList from "../../components/ItemList";
import "./categoryLists.css";
import Select from 'react-select';

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
        <div className="category-lists-header">
          <span className="category-lists-title"> {match.params.type} lists </span>
          <Select
            className="category-lists-select"
            value={this.state.currentSort}
            placeholder="Sort by"
            onChange={this.handleSortChange}
            options={this.sortOptions.map(o => ({ value: o.value, label: o.label }))}
          />
        </div>
        {displayedItems.length !== 0 ?
          <div>
            <div style={{ marginLeft: '1.5vw' }}><Item key={displayedItems[0]._id} {...displayedItems[0]} /></div>
            <br />
            <ItemList items={displayedItems.slice(1)} />
          </div>
          : <div>There are no lists of this category yet. B the first to create one!</div>
        }
      </div>
    );
  }
}

export default inject("store")(observer(CategoryLists));
