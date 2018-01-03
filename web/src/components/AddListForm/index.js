import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
class AddListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment()
    };
  }

  changeDate(when, date) {
    if (when === "start") {
      this.setState({ startDate: date });
    } else {
      this.setState({ endDate: date });
    }
  }

  render() {
    return (
      <form className="add-list-form">
        <h1 className="title">Create new list</h1>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Title" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea className="textarea" placeholder="Description" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Price" />
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
        
        <a className="button submit-btn">Submit</a>
        
      </form>
    );
  }
}

export default AddListForm;
