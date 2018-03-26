import { types, flow, getParent } from "mobx-state-tree";
import UserModel from "./models/User";

const definition = {
  currentUser: types.optional(UserModel, { _id: "-1" }),
  users: types.optional(types.map(UserModel), {})
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
  const getUser = flow(function*(id) {
    try {
      const user = yield self.shop.get(`/user/profile/${id}`);
      self.users.put(user.data);
      return self.users.get(id);
    } catch (error) {
      console.error("Could find user,", error);
    }
  });

  const authenticateCurrentUser = flow(function*({ accessToken, picUrl }) {
    try {
      const userData = yield self.currentUser.login({ accessToken, picUrl });
      setUserAuthData({ ...userData, picUrl });
    } catch (error) {}
  });

  const setUserAuthData = data => {
    self.currentUser = {
      ...(data ? data : self.currentUser.getUserAuthDataFromStorage)
    };
  };

  return {
    getUser,
    authenticateCurrentUser,
    setUserAuthData
  };
};

export const User = types
  .model(definition)
  .views(views)
  .actions(actions);
