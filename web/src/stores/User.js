import { types, flow, getParent } from "mobx-state-tree";
import UserModel from "./models/User";

const definition = {
  currentUser: types.optional(UserModel, { _id: "-1" })
};

const views = self => ({
  get shop() {
    return getParent(self, 1);
  }
});

const actions = self => {
  const getUser = flow(function*(id) {});

  const authenticateCurrentUser = flow(function*(accessToken) {
    yield self.currentUser.login(accessToken);
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
