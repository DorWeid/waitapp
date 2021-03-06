import React from "react";
import "./bigItem.css";
import moment from "moment";

export default ({
  _id,
  title,
  images,
  description,
  price,
  endDate,
  users,
  location,
  status,
  cardWidth = "33%"
}) => {
  const cardStyle = { width: cardWidth };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-image">
        <figure className="image is-4by3">
          <a href={`/list/${_id}`} target="_blank">
            <img
              src={
                images[0] ? images[0].base64 : "http://img.mako.co.il/2015/11/17/hamelech_david_i.jpg"
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
              <p className="title is-3">
                {title}
                {status !== "active" ? (
                  <span style={{ color: "red" }}> - {status}</span>
                ) : null}
              </p>
            </a>
          </div>
          <div className="media-right">
            <p className="price">
              <span className="title is-3">{price}</span>
              <i
                className={`fas fa-shekel-sign`}
                style={{ marginLeft: "2px" }}
              />
            </p>
          </div>
        </div>

        <div className="content">
          <p>
            {users.length === 0
              ? "be the first to w8"
              : `${users.length} people already in the list!
        `}{" "}
          </p>
          {description}
        </div>
      </div>
      <footer className="item-footer">
        <p className="big-location">
          <i className="fa fa-map-marker" style={{ marginRight: "3px" }} />
          {location}
        </p>
        <p className="big-end-date">
          ends{" "}
          <time dateTime={endDate}>
            {moment(endDate)
              .fromNow()}
          </time>
        </p>
      </footer>
    </div>
  );
};
