import { types, flow } from "mobx-state-tree";
import { observable } from "mobx";
import axios from "axios";
import { Item as ItemStore } from "./Item";

const actions = self => {
  return {
    setLoading(isLoading) {
      self.isLoading = isLoading;
    }
  };
};

const validateOptions = ({ options = {}, expectedMethod }) => {
  return true;
};

const views = self => {
  const crud = ["get", "post", "put", "delete"].reduce((acc, method) => {
    acc[method] = flow(function*(url, options = {}) {
      if (!validateOptions(options)) {
        return;
      }

      self.setLoading(true);

      // TODO: Use a middleware instead
      console.log(`Performing a ${method} request to ${url}.`);

      const response = yield axios({
        method,
        url,
        ...options
      });

      self.setLoading(false);

      return response;
    });

    return acc;
  }, {});

  return {
    get get() {
      return crud.get;
    },
    get post() {
      return crud.post;
    },
    get put() {
      return crud.put;
    },
    get delete() {
      return crud.delete;
    }
  };
};

const store = types
  .model("MainStore", {
    itemStore: types.optional(ItemStore, { items: {} }),
    isLoading: types.optional(types.boolean, false)
  })
  .views(views)
  .actions(actions);

export default store.create();
