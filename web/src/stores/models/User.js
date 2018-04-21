import { types, getParent, flow } from "mobx-state-tree";
import ItemModel from "./Item";
import CommentModel from "./Comment.js";

// NOTE: Refer to Item.js model for explanation

const LOCAL_STORAGE_KEYS = {
  LOCAL_STORAGE_PROFILE_IMG_URL: "picture_url",
  LOCAL_STORAGE_PROFILE_USER_NAME: "username",
  LOCAL_STORAGE_PROFILE_EMAIL: "email",
  LOCAL_STORAGE_PROFILE_CREATED_AT: "createdAt",
  LOCAL_STORAGE_PROFILE_USER_MONGO_ID: "_id",
  LOCAL_STORAGE_PROFILE_ADMIN: "admin",
};

const definition = {
  _id: types.identifier(types.string),
  username: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
  picture_url: types.optional(types.string, ""),
  comments: types.optional(types.map(CommentModel), {}),
  admin: types.optional(types.boolean, false),
  items: types.optional(types.map(ItemModel), {}),
  registeredTo: types.optional(types.map(ItemModel), {}),
  creditCard: types.optional(
    types.model({
      number: types.optional(types.string, ""),
      expire: types.optional(types.string, ""),
      name: types.optional(types.string, ""),
      cvc: types.optional(types.string, "")
    }),
    {}
  )
};

const views = self => {
  return {
    get store() {
      // For some reason, if the user is inside the map (and not the current user) then his father is 3 levels high
      const parent = getParent(self, 2);

      if (parent.store) {
        return parent.store;
      }

      return parent;
    },
    get isUserAuthenticated() {
      return Object.keys(LOCAL_STORAGE_KEYS)
        .filter(key => key !== LOCAL_STORAGE_KEYS.LOCAL_STORAGE_PROFILE_ADMIN)
        .every(key => localStorage.getItem(LOCAL_STORAGE_KEYS[key]));
    },
    get getUserAuthDataFromStorage() {
      return Object.keys(LOCAL_STORAGE_KEYS).reduce((acc, key) => {
        const fromStorage = localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
        acc[LOCAL_STORAGE_KEYS[key]] =
          key === "LOCAL_STORAGE_PROFILE_ADMIN"
            ? fromStorage === "true"
            : fromStorage;

        return acc;
      }, {});
    },
    get doesUserHaveCreditCard() {
      return self.creditCard && self.creditCard.number;
    }
  };
};

const actions = self => {
  const setUser = function(user) {
    self._id = user._id;
    self.username = user.username;
    self.email = user.email;
    self.createdAt = user.createdAt;
    self.picture_url = user.picture_url;
    self.admin = user.admin;
    self.creditCard = user.creditCard;

    user.comments.forEach(cmt => self.comments.put(cmt));
  };

  const login = flow(function*({ accessToken }) {
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
      }, Object.assign({}, response.data.user));

      return response.data.user;
    } catch (e) {
      console.log("Could not login. Error:", e.message);
    }
  });

  const acceptList = flow(function*(listId) {
    try {
      yield self.store.post(`/admin/list/${listId}/accept`);
    } catch (error) {
      console.log(`Couldnt accept list ${listId}`, error);
    }
  });

  const denyList = flow(function*(listId) {
    try {
      yield self.store.post(`/admin/list/${listId}/deny`);
    } catch (error) {
      console.log(`Couldnt deny list ${listId}`, error);
    }
  });

  const getPendingLists = flow(function*() {
    try {
      const lists = yield self.store.get("/list/all");
      return lists;
    } catch (error) {
      console.log(`Couldnt fetch pending lists `, error);
    }
  });

  const getUserLists = flow(function*() {
    try {
      const userLists = yield self.store.get(`/user/${self._id}/createdLists`);

      userLists.data.forEach(item => self.items.put(item));
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  const getRegisteredLists = flow(function*() {
    try {
      const userLists = yield self.store.get(`/user/${self._id}/lists`);

      userLists.data.forEach(item => self.registeredTo.put(item));
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  const getUserDetails = flow(function*() {
    try {
      // meh..
      const user = yield self.store.get(`/user/${self._id}`);
      const { comments = [], creditCard = {} } = user.data;

      comments.forEach(cmt => self.comments.put(cmt));
      self.creditCard = creditCard;
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  const update = flow(function*(fields = {}) {
    const options = {
      data: fields
    };

    try {
      const updated = yield self.store.put(`/user/${self._id}`, options);

      if (!updated.data.success) {
        throw new Error("Something on the server went wrong...");
      }

      return true;
    } catch (error) {
      console.error("Couldnt update user.", error);
    }
  });

  return {
    login,
    acceptList,
    denyList,
    getPendingLists,
    getUserLists,
    getRegisteredLists,
    getUserDetails,
    update,
    setUser
  };
};

const User = types
  .model(definition)
  .views(views)
  .actions(actions);

export default User;
