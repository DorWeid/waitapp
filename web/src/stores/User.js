import { types, flow, getParent } from "mobx-state-tree";
import UserModel from "./models/User";

const definition = {
  currentUser: types.optional(UserModel, { _id: "-1" })
};

const views = self => ({
  get shop() {
    return getParent(self, 1);
  },
  get isUserLoggedIn() {
    return self.currentUser._id !== "-1";
  }
});

const actions = self => {
  const getUser = flow(function*(id) {});

  const authenticateCurrentUser = flow(function*({ accessToken, picUrl }) {
    try {
      const userData = yield self.currentUser.login(accessToken);
      self.currentUser = {
        ...userData,
        picUrl
      };
    } catch (error) {}
  });

  return {
    getUser,
    authenticateCurrentUser
  };
};

export const User = types
  .model(definition)
  .views(views)
  .actions(actions);
