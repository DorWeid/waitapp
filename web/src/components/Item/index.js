import React from "react";
import "./item.css";

export default ({ name, img, description, price, currency, location }) => {
  return (
    <div className="card">
      <a href={`/list/${name}`} target="_blank">
        <img
          src={img}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      </a>
    </div>
  );
};
