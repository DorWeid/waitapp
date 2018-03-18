import React from "react";

const UserAvatar = ({ username, picUrl }) => (
  <div>
    <figure className="image is-48x48">
      <img src={picUrl} alt={username} className="avatar-pic" />
    </figure>
  </div>
);

export default UserAvatar;
