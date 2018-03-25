import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import moment from "moment";
import {Redirect} from 'react-router';

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

class AddList extends Component {
  constructor(props) {
    super(props);

    this.addList = this.addList.bind(this);
    this.state = {
        startDate: moment(),
        endDate: moment()
      };
  }

  componentDidMount() {
    let {store: { itemStore } } = this.props;
    itemStore.loadCategories();
    itemStore.clearLatest();
  }

  componentWillUnmount() {
    let {store: { itemStore } } = this.props;
    itemStore.clearLatest();
  }

   addList() {
    const { store: { itemStore } } = this.props;
    itemStore
        .addList(this.state.type, {price: 515} , this.state.title, this.state.description, this.state.price, this.state.location, this.state.startDate, this.state.endDate);
  }

  changeDate(when, date) {
    if (when === "start") {
      this.setState({ startDate: date });
    } else {
      this.setState({ endDate: date });
    }
  }

  render() {
      const { store: {itemStore, userStore}} = this.props;

      if (itemStore.latestListAdded !== "") {
          return (<Redirect to={`/list/${itemStore.latestListAdded}`} />);
      } else if(!userStore.currentUser.username) {
        return (<Redirect to={`/`} />);
      } else {
    return (
        <div style={{ marginTop: 100, zIndex: 15, position: "relative" }}>
      <form className="add-list-form">
        <h1 className="title">Create new list</h1>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Title" onChange={(e) => this.setState({title : e.target.value})} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea className="textarea" placeholder="Description" onChange={(e) => this.setState({description : e.target.value})} />
          </div>
        </div>
        <div className="field">
          <Select
            name="form-field-name"
            value={this.state.type || ''}
            placeholder="Category"
            onChange={(option) => this.setState({type : option.value})}
            options={itemStore.categories.map(c => ({value: c.en, label: c.en}))}
          />
        </div>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Price" onChange={(e) => this.setState({price : e.target.value})} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Location" onChange={(e) => this.setState({location : e.target.value})} />
          </div>
        </div>
        <div className="field">
          <div className="control date-control">
            <span className="date-container">
              <span className="date-header">From</span>
              <DatePicker
                inline
                selected={this.state.startDate}
                onChange={this.changeDate.bind(this, "start")}
              />
            </span>
            <span className="date-container">
              <span className="date-header">To</span>
              <DatePicker
                inline
                selected={this.state.endDate}
                onChange={this.changeDate.bind(this, "end")}
              />
            </span>
          </div>
        </div>

        <a className="button submit-btn" onClick={this.addList}>Submit</a>

      </form>
      </div>
    );
}
}
}

export default inject("store")(observer(AddList));
