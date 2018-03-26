import React from "react";
import { observer, inject } from "mobx-react";
import Cards from "react-credit-cards";
import { ItemList, Comment } from "../../components";
import StarRatingComponent from "react-star-rating-component";
import { Link } from "react-router-dom";
import "./UserProfile.css";

// Needed for credit-card component
import "react-credit-cards/es/styles-compiled.css";

class UserProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focused: "",
      updateMessage: "",
      content: "",
      rating: 0
    };
  }

  componentDidMount() {
    const { match, store: { userStore } } = this.props;

    if (!this.isCurrentUserProfile()) {
      userStore.getUser(match.params.userId).then(user => {
        user.getUserLists();
      });
    } else {
      userStore.currentUser.getUserLists();
      userStore.currentUser.getRegisteredLists();
      userStore.currentUser.getUserDetails();
    }
  }

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      this.setState({
        [target.name]: target.value.replace(/ /g, "")
      });
    } else if (target.name === "expiry") {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, "")
      });
    } else {
      this.setState({
        [target.name]: target.value
      });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  isCurrentUserProfile = () => {
    const { match, store: { userStore } } = this.props;

    return match.params.userId === userStore.currentUser._id;
  };

  updateUserCreditCard = () => {
    const { store: { userStore } } = this.props;

    userStore.currentUser
      .update({
        creditCard: {
          number: this.state.number,
          name: this.state.name,
          expire: this.state.expiry,
          cvc: this.state.cvc
        }
      })
      .then(success => {
        this.setState({
          updateMessage: success
            ? "Updated credit card!"
            : "Something went wrong.."
        });
      });

    this.setState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focused: ""
    });

    document.getElementById("credit-form").reset();
  };

  renderCurrentUserProfile = () => {
    const { store: { userStore } } = this.props;
    const { name, number, expiry, cvc, focused } = this.state;

    return (
      <div className="profile-bg">
        <h1 className="title is-1 profile-title">
          {userStore.currentUser.username}
        </h1>
        <img
          src={userStore.currentUser.picUrl}
          alt={userStore.currentUser.username}
          className="image is-96x96 profile-user-img"
        />
        <div
          style={{
            width: "100%",
            marginTop: 40
          }}
        >
          <h4 className="title is-4">
            <u>My Lists</u>
          </h4>
          {userStore.currentUser.items.size ? (
            <ItemList items={userStore.currentUser.items.values()} />
          ) : (
            <p>You have not signed up to a list yet...</p>
          )}
        </div>

        <div
          style={{
            width: "100%",
            marginTop: 40
          }}
        >
          <h4 className="title is-4">
            <u>Created Lists</u>
          </h4>
          <Link to={`/${userStore.currentUser._id}/addList`} className="button">
            <span className="icon is-small">
              <i className="fas fa-plus" />
            </span>
          </Link>
          <br />
          <br />
          {userStore.currentUser.items.size ? (
            <ItemList items={userStore.currentUser.items.values()} />
          ) : (
            <p>You dont have any lists yet...</p>
          )}
        </div>
        <div style={{ width: "100%", marginTop: 40 }}>
          <h4 className="title is-4">
            <u>Comments</u>
          </h4>
          {this.renderComments(userStore.currentUser.comments.values())}
        </div>
        <section className="section profile-bottom">
          <div className="profile-credit">
            <h4 className="title is-5">Add Credit Card Details</h4>
            {userStore.currentUser.creditCard.number && (
              <div>
                <p>Your current credit card:</p>
                ****-****-****-
                <b>
                  {userStore.currentUser.creditCard.number.slice(
                    userStore.currentUser.creditCard.number.length - 4,
                    userStore.currentUser.creditCard.number.length
                  )}
                </b>
                <br />
                <br />
              </div>
            )}
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
            />
            <form
              id="credit-form"
              className="add-list-form"
              style={{ margin: 20 }}
            >
              <div>
                <input
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <div>E.g.: 49..., 51..., 36..., 37...</div>
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="expiry"
                  placeholder="Valid Thru"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <input
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </form>
            <a
              className="button submit-btn"
              onClick={this.updateUserCreditCard}
            >
              Submit
            </a>
            {this.state.updateMessage && (
              <p>
                <b>{this.state.updateMessage}</b>
              </p>
            )}
          </div>
        </section>
      </div>
    );
  };

  renderRandomUserProfile = () => {
    const { match, store: { userStore, itemStore } } = this.props;
    const randomUserObject = userStore.users.get(match.params.userId);

    // If user has not been loaded yet or not found...
    if (!randomUserObject) {
      return (
        <div style={{ position: "absolute", top: 200, left: 0, right: 0 }}>
          <h1 className="title is-1">User not found!</h1>
        </div>
      );
    }

    const hasUserCommented = !!randomUserObject.comments
      .values()
      .find(cmt => cmt.userId === userStore.currentUser._id);

    return (
      <div className="profile-bg">
        <h1 className="title is-1 profile-title">
          {randomUserObject.username}
        </h1>
        <img
          src={randomUserObject.picUrl}
          alt={randomUserObject.username}
          className="image is-96x96 profile-user-img"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 50
          }}
        >
          <div style={{ width: "50%", borderRight: "1px solid #000" }}>
            <h4 className="title is-4">
              <u>Lists</u>
            </h4>
            <br />
            <ItemList items={itemStore.items.values()} />
          </div>
          <div style={{ width: "50%" }}>
            <h4 className="title is-4">
              <u>Comments</u>
            </h4>
            {!hasUserCommented ? (
              <form id="add-comment" className="add-list-form">
                <h1 className="title is-4">Add a comment</h1>
                <StarRatingComponent
                  name="input-comment-rating"
                  onStarClick={rating => this.setState({ rating })}
                  value={this.state.rating}
                />
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      type="text"
                      placeholder="Content"
                      onChange={e => this.setState({ content: e.target.value })}
                    />
                  </div>
                </div>
                <a className="button submit-btn" onClick={this.addComment}>
                  Submit
                </a>
              </form>
            ) : (
              "You have already commented"
            )}
          </div>
        </div>
      </div>
    );
  };

  addComment = () => {
    this.props.store.userStore.currentUser.addComment({
      rating: this.state.rating,
      content: this.state.content
    });

    this.setState({ rating: 0 });
    document.getElementById("add-comment").reset();
  };

  renderComments = (comments = []) => {
    const { store: { userStore } } = this.props;

    if (!comments.length) {
      return <p>No comments yet...</p>;
    }

    return (
      <div>
        {comments.map(cmt => (
          <Comment
            key={cmt.userId}
            rating={cmt.rating}
            content={cmt.content}
            author={cmt.username} // This should be taken from server
            picUrl={userStore.currentUser.picUrl} // This should be taken from server
          />
        ))}
      </div>
    );
  };

  render() {
    return this.isCurrentUserProfile()
      ? this.renderCurrentUserProfile()
      : this.renderRandomUserProfile();
  }
}

export default inject("store")(observer(UserProfile));
