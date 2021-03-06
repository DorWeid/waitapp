import {types, getParent, flow} from "mobx-state-tree";

export const categories = [
  {
    en: "hotel",
    he: "מלונות"
  }, {
    en: "car",
    he: "מכוניות"
  }, {
    en: "flight",
    he: "טיסות"
  }
];

// The model definition
const definition = {
  _id: types.identifier(types.string),
  title: types.optional(types.string, ""),
  description: types.optional(types.string, ""),
  price: types.optional(types.string, ""),
  startDate: types.optional(types.string, ""),
  endDate: types.optional(types.string, ""),
  type: types.enumeration(categories.map(c => c.en)),
  createdAt: types.optional(types.string, ""),
  location: types.optional(types.string, ""),
  users: types.optional(types.array(types.string), []),
  status: types.optional(types.string, "pending"),
  creator: types.optional(types.string, ""),
  creatorName: types.optional(types.string, ""),
  meta: types.optional(types.map(types.frozen), {}),
  images: types.optional(types.array(types.frozen), []),
  listEndDate: types.optional(types.string, ""),
  currentRedeemers: types.optional(types.array(types.string), []),
  currentRedeemersIndex: types.optional(types.number, 0),
  roundEndDate: types.optional(types.string, ""),
  winners: types.optional(types.array(types.string), []),
  amount: types.optional(types.number, 0),
};

// Any fact that can be derived from the state in a pure manner should go here.
const views = self => {
  return {
    get describeMe() {
      return `
        ID: ${self.id}
        Name: ${self.name}
        Author: ${self.author}
        Price: ${self.price}`;
    },
    get store() {
      return getParent(self, 3);
    }
  };
};

// Modifying nodes can only be done by actions Simply put, state can be changed
// only by actions
// NOTE: Your async functions should probably go here
const actions = self => {
  const enroll = flow(function * (username) {
    const url = `/list/${self._id}/addUser`;
    const options = {
      data: {
        username
      }
    };
    try {
      yield self
        .store
        .post(url, options);
      console.log("Succesfully signed up!");
    } catch (e) {
      console.log("Could not sign up. Error:", e.message);
    }
  });

  const startList = flow(function * () {
    try {
      yield self
        .store
        .post(`/list/${self._id}/start`);
    } catch (error) {
      console.log("error while starting list", error);
    }
  });

  const disenroll = flow(function * (username) {
    const url = `/list/${self._id}/removeUser`;
    const options = {
      data: {
        username
      }
    };
    try {
      yield self
        .store
        .delete(url, options);
      console.log("Succesfully disenrolled from list!");
    } catch (e) {
      console.log("Could not disenroll. Error:", e.message);
    }
  });

  const redeem = flow(function * (username) {
    const url = `/list/${self._id}/redeem`;
    const options = {
      data: {
        username
      }
    };
    try {
      yield self
        .store
        .post(url, options);
      console.log("Succesfully redeem the item!");
    } catch (e) {
      console.log("Could not redeem. Error:", e.message);
    }
  });

  // TODO: This should be in views
  const isUserInList = username => {
    return self
      .users
      .includes(username);
  };

  return {enroll, disenroll, startList, isUserInList, redeem};
};

const Item = types
  .model(definition)
  .views(views)
  .actions(actions);

export default Item;
