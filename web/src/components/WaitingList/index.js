import React from "react";

const WaitingList = ({users}) => {
  return (
    <div className="box">
      <p className="title is-5">Currently Waiting:</p>
      <ul>
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default WaitingList;
