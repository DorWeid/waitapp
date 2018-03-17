import { types, getParent, flow } from "mobx-state-tree";

// NOTE: Refer to Item.js model for explanation

const definition = {
  _id: types.identifier(types.string),
  username: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  createdAt: types.optional(types.string, "")
};

const views = self => {
  return {
    get store() {
      return getParent(self, 2);
    }
  };
};

const actions = self => {
  const login = flow(function*(accessToken) {
    const url = "/auth";

    const options = {
      data: { access_token: accessToken },
      withCredentials: true
    };

    try {
      const response = yield self.store.post(url, options);
      debugger;
      return response;
    } catch (e) {
      console.log("Could not sign up. Error:", e.message);
    }
  });

  return {
    login
  };
};

const User = types
  .model(definition)
  .views(views)
  .actions(actions);

export default User;
