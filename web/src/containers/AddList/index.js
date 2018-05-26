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
    this.changeTime = this.changeTime.bind(this);
    this.state = {
        startDate: moment(),
        endDate: moment(),
        startHour: moment(),
        endTime: moment()
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
    const start = moment(this.state.startDate.format('YYYY-MM-DD') + ' ' + this.state.startTime)
    const end = moment(this.state.endDate.format('YYYY-MM-DD') + ' ' + this.state.endTime)

    itemStore
    .addList(this.state.type, {price: 515} , this.state.title, this.state.description, this.state.price, this.state.location, start, end, this.state.amount);
    alert('List has been added! we will let you know when we approve or deny it');
  }

  changeDate(when, date) {
    if (when === "start") {
      this.setState({ startDate: date });
    } else {
      this.setState({ endDate: date });
    }
  }

  changeTime(when, time) {
    if (when === "start") {
      this.setState({ startTime: time });
    } else {
      this.setState({ endTime: time });
    }
  }

  render() {
      const { store: {itemStore, userStore}, match} = this.props;

      if (itemStore.latestListAdded !== "") {
          return (<Redirect to={`/list/${itemStore.latestListAdded}`} />);
      } else if(!userStore.currentUser.username && !match.params.userId) { // TODO: Check if match condition is needed
        return (<Redirect to={`/`} />);
      } else {
    return (
        <div style={{ marginTop: 100, zIndex: 15, position: "relative" }}>
      <form className="add-list-form">
        <h1 className="title">Create new list</h1>
        <div className="fields-group">
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Title" onChange={(e) => this.setState({title : e.target.value})} />
            </div>
          </div>
          <div className="field">
            <Select
              name="form-field-select"
              className="form-field-select"
              value={this.state.type || ''}
              placeholder="Category"
              onChange={(option) => this.setState({type : option.value})}
              options={itemStore.categories.map(c => ({value: c.en, label: c.en}))}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea className="textarea" placeholder="Description" onChange={(e) => this.setState({description : e.target.value})} />
          </div>
        </div>
        <div className="fields-group">        
          <div className="field">
            <div className="control">
              <input className="input price-field" type="text" placeholder="Price" onChange={(e) => this.setState({price : e.target.value})} />
              <i className="fas fa-dollar-sign" />                              
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input location-field" type="text" placeholder="Location" onChange={(e) => this.setState({location : e.target.value})} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input amount-field" type="text" placeholder="Max winners" onChange={(e) => this.setState({amount : e.target.value})} />
            </div>
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
              <div className="field">
                <div className="control" style={{display: 'flex', alignItems: 'center'}}>
                  <label style={{marginBottom: 0}}>Opening time:</label>
                  <input className="input time-field" type="time" placeholder="Opening time" onChange={(e) => this.changeTime('start', e.target.value)} />
                </div>
              </div>
            </span>
            <span className="date-container">
              <span className="date-header">To</span>
              <DatePicker
                inline
                selected={this.state.endDate}
                onChange={this.changeDate.bind(this, "end")}
              />
              <div className="field">
                <div className="control" style={{display: 'flex', alignItems: 'center'}}>
                  <label style={{marginBottom: 0}}>Ending time:</label>
                  <input className="input time-field" type="time" placeholder="Ending time" onChange={(e) => this.changeTime('end', e.target.value)} />
                </div>
              </div>
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
