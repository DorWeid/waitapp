import { types, flow, getParent } from "mobx-state-tree";
import UserModel from "./models/User";
import ItemModel from "./models/Item";

const definition = {
  currentUser: types.optional(UserModel, { _id: "-1" }),
  items: types.optional(types.map(ItemModel), {})
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

  const getUserLists = flow(function*(id) {
    try {
      console.log("curr", self.currentUser);
      const userLists = yield self.shop.get(
        `/users/${self.currentUser._id}/createdLists`
      );
      userLists.forEach(item => self.items.put(item));
    } catch (error) {
      console.error("Couldnt fetch items", error);
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
    setUserAuthData,
    getUserLists
  };
};

export const User = types
  .model(definition)
  .views(views)
  .actions(actions);
