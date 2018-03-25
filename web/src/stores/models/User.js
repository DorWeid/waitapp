import { types, getParent, flow } from "mobx-state-tree";
import ItemModel from "./Item";
import CommentModel from "./Comment.js";

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
  items: types.optional(types.map(ItemModel), {}),
  comments: types.optional(types.map(CommentModel), {})
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

  const getUserLists = flow(function*() {
    try {
      const userLists = yield self.store.get(`/user/${self._id}/createdLists`);

      userLists.data.forEach(item => self.items.put(item));
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  const getCommentsOnUser = flow(function*() {
    try {
      // meh..
      const user = yield self.store.get(`/user/${self._id}`);
      const { comments = [] } = user.data;

      comments.forEach(cmt => self.comments.put(cmt));
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  const addComment = flow(function*({ content, rating }) {
    const options = {
      data: {
        content,
        rating
      }
    };
    try {
      const result = yield self.store.post(
        `/user/${self._id}/comment`,
        options
      );

      if (!result.data.success) {
        throw new Error("Something went wrong in the server...");
      }

      // TODO: Push data from server here
      self.comments.put({
        content,
        rating,
        userId: self._id
      });

      return true;
    } catch (error) {
      console.error("Couldnt add comment: ", error);
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
    getUserLists,
    getCommentsOnUser,
    addComment,
    update
  };
};

const User = types
  .model(definition)
  .views(views)
  .actions(actions);

export default User;
