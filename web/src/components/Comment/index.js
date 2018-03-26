import React from "react";
import StarRatingComponent from "react-star-rating-component";
import "./Comment.css";

export default class Comment extends React.Component {
  render() {
    const { author, content, picUrl, rating } = this.props;
    return (
      <div className="comment-container">
        <div style={{ paddingRight: 25 }}>
          <img
            src={picUrl}
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
