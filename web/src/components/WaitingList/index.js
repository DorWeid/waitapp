import React from "react";

const WaitingList = ({ users }) => {
  return (
    <div className="box">
      <p className="title is-5">Currently Waiting:</p>
      <p>{users}</p>
    </div>
  );
};

export default WaitingList;
