import { types, getParent, flow } from "mobx-state-tree";

// NOTE: Refer to Item.js model for explanation

const LOCAL_STORAGE_PROFILE_IMG_URL = "imgUrl";
const LOCAL_STORAGE_PROFILE_USER_NAME = "username";
const LOCAL_STORAGE_PROFILE_EMAIL = "email";
const LOCAL_STORAGE_PROFILE_CREATED_AT = "createdAt";
const LOCAL_STORAGE_PROFILE_USER_MONGO_ID = "_id";

const definition = {
  _id: types.identifier(types.string),
  username: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
  picUrl: types.optional(types.string, "")
};

const views = self => {
  return {
    get store() {
      return getParent(self, 2);
    },
    get isUserAuthenticated() {
      return (
        localStorage.getItem(LOCAL_STORAGE_PROFILE_IMG_URL) &&
        localStorage.getItem(LOCAL_STORAGE_PROFILE_EMAIL) &&
        localStorage.getItem(LOCAL_STORAGE_PROFILE_USER_NAME) &&
        localStorage.getItem(LOCAL_STORAGE_PROFILE_CREATED_AT) &&
        localStorage.getItem(LOCAL_STORAGE_PROFILE_USER_MONGO_ID)
      );
    },
    get getUserAuthDataFromStorage() {
      return {
        username: localStorage.getItem(LOCAL_STORAGE_PROFILE_USER_NAME),
        picUrl: localStorage.getItem(LOCAL_STORAGE_PROFILE_IMG_URL),
        email: localStorage.getItem(LOCAL_STORAGE_PROFILE_EMAIL),
        createdAt: localStorage.getItem(LOCAL_STORAGE_PROFILE_CREATED_AT),
        _id: localStorage.getItem(LOCAL_STORAGE_PROFILE_USER_MONGO_ID)
      };
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

      const { email, username, createdAt, _id } = response.data.user;

      localStorage.setItem(LOCAL_STORAGE_PROFILE_EMAIL, email);
      localStorage.setItem(LOCAL_STORAGE_PROFILE_USER_NAME, username);
      localStorage.setItem(LOCAL_STORAGE_PROFILE_CREATED_AT, createdAt);
      localStorage.setItem(LOCAL_STORAGE_PROFILE_IMG_URL, picUrl);
      localStorage.setItem(LOCAL_STORAGE_PROFILE_USER_MONGO_ID, _id);

      return response.data.user;
    } catch (e) {
      console.log("Could not login. Error:", e.message);
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
