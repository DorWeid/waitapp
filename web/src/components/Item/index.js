import React from "react";
import "./item.css";
import moment from "moment";

export default ({ _id, title, img, description, price, endDate, users, location }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <a href={`/list/${_id}`} target="_blank">
            <img
              src={
                img || "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg"
              }
              alt={_id}
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
          </a>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <a href={`/list/${_id}`} target="_blank">
              <p className="title is-5">{title}</p>
            </a>
          </div>
          <div className="media-right">
            <p className="price">
              <span className="title is-5">{price}</span>
              <i className={`fa fa-shekel`} style={{ marginLeft: "2px" }} />
            </p>
          </div>
        </div>

        <div className="content">
          <p>
          {users.length === 0 ? 'be the first to w8' : `${users.length} people already in the list!
        `} </p>
        </div>
      </div>
      <footer className="item-footer">
        <p className="location">
          <i className="fa fa-map-marker" style={{ marginRight: "3px" }} />
          {location}
        </p>
        <p className="end-date">
          ends{" "}
          <time dateTime={endDate}>
            {moment(endDate)
              .endOf("day")
              .fromNow()}
          </time>
        </p>
      </footer>
    </div>
  );
};
