import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import DatePicker from "react-datepicker";
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

   addList() {
    const { store: { itemStore, userStore } } = this.props;
    let username = userStore.currentUser._id;
    itemStore
        .addList(username,'hotel', {price: 515} , this.state.title, this.state.description, this.state.price, this.state.startDate, this.state.endDate);    
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
          <div className="control">
            <input className="input" type="text" placeholder="Price" onChange={(e) => this.setState({price : e.target.value})} />
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
