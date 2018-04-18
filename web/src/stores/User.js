import { types, flow, getParent } from "mobx-state-tree";
import UserModel from "./models/User";

const definition = {
  currentUser: types.optional(UserModel, { _id: "-1" }),
  users: types.optional(types.map(UserModel), {})
};

const views = self => ({
  get store() {
    return getParent(self, 1);
  },
  get isUserLoggedIn() {
    return self.currentUser._id !== "-1";
  }
});

const actions = self => {
  const getUser = flow(function*(id) {
    try {
      const user = yield self.store.get(`/user/${id}`);

      const userObject = UserModel.create({
        _id: user.data._id
      });

      userObject.setUser(user.data);

      self.users.put(userObject);
      return self.users.get(id);
    } catch (error) {
      console.error("Could find user,", error);
    }
  });

  const authenticateCurrentUser = flow(function*({ accessToken }) {
    try {
      const userData = yield self.currentUser.login({ accessToken });
      const userObject = UserModel.create({
        _id: userData._id
      });
      self.currentUser = userObject;
      self.currentUser.setUser(userData);
    } catch (error) {
      console.log("Error:", error);
    }
  });

  const setUserAuthData = data => {
    self.currentUser = {
      ...(data ? data : self.currentUser.getUserAuthDataFromStorage)
    };
  };

  const addComment = flow(function*({ content, rating, userId }) {
    const options = {
      data: {
        content,
        rating
      }
    };
    try {
      const result = yield self.store.post(
        `/user/${userId}/comment`,
        options
      );

      if (!result.data.success) {
        throw new Error("Something went wrong in the server...");
      }

      // TODO: Get the comment back from the server instead of loading the entire user object again
      yield getUser(userId);

      // self.comments.put({
      //   content,
      //   rating,
      //   userId: self._id
      // });

      return true;
    } catch (error) {
      console.error("Couldnt add comment: ", error);
    }
  });

  return {
    getUser,
    authenticateCurrentUser,
    setUserAuthData,
    addComment
  };
};

export const User = types
  .model(definition)
  .views(views)
  .actions(actions);
