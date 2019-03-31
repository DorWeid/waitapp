import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { observer, inject } from "mobx-react";
import "./Comment.css";

class Comment extends React.Component {
  render() {
    const { author, content, picture_url, rating, authorId, store: { userStore } } = this.props;

    const isCurrentUsersComment = userStore.isUserLoggedIn && userStore.currentUser._id === authorId;

    return (
      <div className="comment-container">
        {isCurrentUsersComment && <button className="delete" style={{ marginRight: 5 }}/>}
        <div style={{ paddingRight: 25 }}>
          <img
            src={picture_url}
            alt={author}
            className="image is-64x64 profile-user-img"
          />
        </div>
        <div className="comment-content">
          <div className="comment-author">
            <b>{author}</b>
          </div>
          <div>{content}</div>
          <div>
            <StarRatingComponent
              name="comment-star-rating"
              value={rating}
              editing={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default inject("store")(observer(Comment));
