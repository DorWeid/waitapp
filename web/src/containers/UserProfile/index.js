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
      isSubscribed: false,
      selectedTab: 0,
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focused: "",
      updateMessage: "",
      personalInfoUpdateMessage: '',
      content: "",
      rating: 0,
      subsLength: '0',
      phone: null,
    };

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    const { match, store: { userStore } } = this.props;

    if (!this.isCurrentUserProfile()) {
      userStore.getUser(match.params.userId).then(user => {
        this.setState({ user })
        const userJSON = user.toJSON()

        const subs = Object.keys(userJSON.subs) || []
        if (subs.indexOf(userStore.currentUser._id) !== -1)  {
          this.setState({ isSubscribed: true})
        }

        this.setState({ subsLength: subs.length})

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

  async updateUser() {
    const { store: { userStore } } = this.props;

    try {
      const result = await userStore.currentUser.update({ mobileNumber: this.state.phone })
      this.setState({
        personalInfoUpdateMessage: result ? "Updated info" : "Something went wrong.."
      });
      
    } catch (error) {
      
    }
  }

  renderCurrentUserProfile = () => {
    const { store: { userStore } } = this.props;
    const { name, number, expiry, cvc, focused } = this.state;

    return (
      <div className="profile-bg">
        <h1 className="title is-1 profile-title">
          {userStore.currentUser.username}
        </h1>
        <img
          src={userStore.currentUser.picture_url}
          alt={userStore.currentUser.username}
          className="image is-96x96 profile-user-img"
        />
        <Link to={`/${userStore.currentUser._id}/addList`} className="button" style={{marginTop: 10}}>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span style={{paddingLeft: 5}}>Create a New List</span>
        </Link>

        <div style={{ width: "100%", marginTop: 40 }}>
          <h4 className="title is-4">
            <u>Comments</u>
          </h4>
          {this.renderComments(userStore.currentUser.comments.values())}
        </div>
        <hr style={{color: 'white', width: '100%', height: 2}}/>


        <h2 className="title is-2" style={{textAlign: 'center'}}>Personal Area</h2>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
          <section className="section">
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
          <section className="section" style={{width: '30%'}}>
            <div className="profile-credit" style={{width: '100%'}}>
              <h4 className="title is-5">Update Info</h4>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <label>Phone: </label>
                <input type="tel" onChange={e => this.setState({phone: e.target.value})} />
              </div>
              <a
                className="button submit-btn"
                onClick={this.updateUser}
              >
                Update
              </a>
              {this.state.personalInfoUpdateMessage && (
                <p>
                  <b>{this.state.personalInfoUpdateMessage}</b>
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  };

  renderRandomUserProfile = () => {
    const { match, store: { userStore } } = this.props;
    const randomUserObject = userStore.users.get(match.params.userId);

    // If user has not been loaded yet or not found...
    if (!randomUserObject) {
      return (
        <div style={{ position: "absolute", top: 200, left: 0, right: 0 }}>
          <h1 className="title is-1">User not found!</h1>
        </div>
      );
    }


    return (
      <div className="profile-bg">
        <div className="box" style={{width: '90%', padding: 30}}>
          <article className="media" style={{display: 'flex', alignItems: 'center'}}>
            <div className="media-left">
              <figure className="image is-96x96">
                <img
                  src={randomUserObject.picture_url}
                  alt={randomUserObject.username}
                  className="profile-user-img"
                />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong style={{fontSize: 'x-large'}}><b>{randomUserObject.username}</b></strong>
                  <br />
                  <br />
                  <span style={{fontSize: 'large'}}>{randomUserObject.items.size} Lists</span>
                </p>
              </div>
            </div>
            <div className="media-right" style={{paddingRight: 40, paddingTop: 7, textAlign: 'center'}}>
              <StarRatingComponent
                name="user-rating"
                value={randomUserObject.rating || 4}
                editing={false}
              />
              <br />
              <br />
              <strong style={{fontSize: 'medium'}}>Rating</strong>
            </div>
            <div className="media-right" style={{textAlign: 'center'}}>
              <button className={this.state.isSubscribed ? "button is-success is-large" : "button is-primary is-large"} onClick={() => {
                this.subscribe()
                // this.setState({ isSubscribed: !this.state.isSubscribed});
              }}>
                {this.state.isSubscribed ?
                  <div style={{display: 'flex'}}>
                    <span className="icon is-small" key={1}>
                      <i className="fa fa-check"/>
                    </span>
                    <span style={{paddingLeft: 5}}><strong>Subscribed</strong></span>
                  </div> :
                  <div style={{display: 'flex'}}>
                    <span className="icon is-small" key={2}>
                      <i className="fa fa-plus" />
                    </span>
                    <span style={{paddingLeft: 5}}><strong>Subscribe</strong></span>
                  </div>
                }
              </button>
              <br />
              <strong style={{fontSize: 'small'}}>{this.state.subsLength} Subscribers</strong>
            </div>
          </article>
          <hr />
          <div className="level">
            <div className="level-left">
              <div className="level-item profile-hover-item" style={{fontSize: 'medium'}} onClick={() => {this.setState({selectedTab: 0});}}>
                {this.state.selectedTab === 0 ?
                  <strong>Lists ({randomUserObject.items.size})</strong>:
                  <span>Lists ({randomUserObject.items.size})</span>
                }
              </div>
              <div className="level-item profile-hover-item" style={{marginLeft: 20, fontSize: 'medium'}} onClick={() => {this.setState({selectedTab: 1});}}>
                {this.state.selectedTab === 1 ?
                  <strong>Comments ({randomUserObject.comments.size})</strong>:
                  <span>Comments ({randomUserObject.comments.size})</span>
                }
              </div>
            </div>
          </div>
          <div>
            {this.renderTabContent({ items: randomUserObject.items.values(), comments: randomUserObject.comments.values() })}
          </div>
        </div>
      </div>
    );
  };

  renderTabContent = ({ items = [], comments = [] }) => {
    const hasUserCommented = comments.find(cmt => cmt.userId === this.props.store.userStore.currentUser._id);

    switch (this.state.selectedTab) {
      case 0:
        return (
          <ItemList items={items} cardWidth="25%" />
        );

      case 1:
        return (
          <div>
            {(!hasUserCommented &&
              this.props.store.userStore.isUserLoggedIn) && (
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
                        onChange={e =>
                          this.setState({ content: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <a className="button submit-btn" onClick={this.addComment}>
                    Submit
                  </a>
                </form>
              )}
              {this.renderComments(comments)}
          </div>
        );

      default:
        return null;
    }
  }


  subscribe = () => {
    if (!this.state.isSubscribed) {
      this.props.store.userStore.subscribe({
        userId: this.props.match.params.userId
      })
      .then((res) => {
        const oldSubs = +this.state.subsLength
        this.setState({ isSubscribed: true, subsLength: oldSubs + 1 })
        console.log('res', res)
      })
      .catch(e => {
        console.error('e', e)
      })

    } else {
      this.props.store.userStore.unsubscribe({
        userId: this.props.match.params.userId
      })
      .then((res) => {
        const oldSubs = +this.state.subsLength
        this.setState({ isSubscribed: false, subsLength: oldSubs - 1 })
      })
      .catch(e => {
        console.error('e', e)
      })
    }
  }
  addComment = () => {
    this.props.store.userStore.addComment({
      rating: this.state.rating,
      content: this.state.content,
      userId: this.props.match.params.userId
    });

    this.setState({ rating: 0 });
    document.getElementById("add-comment").reset();
  };

  renderComments = (comments = []) => {
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
            author={cmt.username}
            picture_url={cmt.picture_url}
            authorId={cmt.userId}
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
