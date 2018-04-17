import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./homepage.css";
import Slider from "../../components/Slider";
import TopFive from "../../components/TopFive";
import CategoryLists from "../CategoryLists";
import scrollToElement from "scroll-to-element";

class HomePage extends Component {
  autoPlay = true;

  constructor(props) {
    super(props);

    this.state = {};
    this.changeCategory = this.changeCategory.bind(this);
    this.setAutoplay = this.setAutoplay.bind(this);
  }

  componentDidMount() {
    let { store: { itemStore: { loadCategories } } } = this.props;
    loadCategories();

    window.onscroll = () => this.setAutoplay(document.documentElement.scrollTop);
  }

  setAutoplay(heightToTop) {
    this.autoPlay = heightToTop < 10;
  }

  changeCategory(slideNum) {
    let { store: { itemStore: { categories = [], changeCurrentCategory } } } = this.props;
    if (categories) {
      changeCurrentCategory(categories[slideNum]);
    }
  }

  render() {
    const { store: { itemStore: { currDisplayedCatergory, items = [] } } } = this.props;
    return (
      <div className="homepage-container">
        <TopFive items={items.values().slice(0, 6)}/>
        <Slider changeCategory={this.changeCategory} autoPlay={this.autoPlay} />
        <div
          className="arrow-icon-container"
          onClick={() => {
            scrollToElement(document.querySelector(".category-lists-container"));
          }}
        >
          <p className="explore-more">Explore More</p>
          <i className="fas fa-arrow-circle-down" />
        </div>
        <CategoryLists category={currDisplayedCatergory} />
      </div>
    );
  }
}

export default inject("store")(observer(HomePage));
