import React from "react";

const UserAvatar = ({ username, picture_url }) => (
  <div style={{margin: "auto 0"}}>
    <figure className="image is-48x48">
      <img src={picture_url} alt={username} className="avatar-pic" />
    </figure>
  </div>
);

export default UserAvatar;
