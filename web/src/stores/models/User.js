import { types, getParent, flow } from "mobx-state-tree";
import ItemModel from "./Item";

// NOTE: Refer to Item.js model for explanation

const LOCAL_STORAGE_KEYS = {
  LOCAL_STORAGE_PROFILE_IMG_URL: "picUrl",
  LOCAL_STORAGE_PROFILE_USER_NAME: "username",
  LOCAL_STORAGE_PROFILE_EMAIL: "email",
  LOCAL_STORAGE_PROFILE_CREATED_AT: "createdAt",
  LOCAL_STORAGE_PROFILE_USER_MONGO_ID: "_id"
};

const definition = {
  _id: types.identifier(types.string),
  username: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
  picUrl: types.optional(types.string, ""),
  items: types.optional(types.map(ItemModel), {})
};

const views = self => {
  return {
    get store() {
      return getParent(self, 2);
    },
    get isUserAuthenticated() {
      return Object.keys(LOCAL_STORAGE_KEYS).every(key =>
        localStorage.getItem(LOCAL_STORAGE_KEYS[key])
      );
    },
    get getUserAuthDataFromStorage() {
      return Object.keys(LOCAL_STORAGE_KEYS).reduce((acc, key) => {
        acc[LOCAL_STORAGE_KEYS[key]] = localStorage.getItem(
          LOCAL_STORAGE_KEYS[key]
        );

        return acc;
      }, {});
    }
  };
};

const actions = self => {
  const login = flow(function*({ accessToken, picUrl }) {
    const url = "/auth";

    const options = {
      data: { access_token: accessToken },
      withCredentials: true
    };

    try {
      const response = yield self.store.post(url, options);

      Object.keys(LOCAL_STORAGE_KEYS).forEach(function(key) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS[key],
          this[LOCAL_STORAGE_KEYS[key]]
        );
      }, Object.assign({ picUrl }, response.data.user));

      return response.data.user;
    } catch (e) {
      console.log("Could not login. Error:", e.message);
    }
  });

  const getUserLists = flow(function*(id) {
    try {
      const userLists = yield self.shop.get(`/users/${self._id}/createdLists`);
      userLists.forEach(item => self.items.put(item));
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  const update = flow(function*(fields) {});

  return {
    login,
    getUserLists,
    update
  };
};

const User = types
  .model(definition)
  .views(views)
  .actions(actions);

export default User;
