import { flow, types } from "mobx-state-tree";
import axios from "axios";

// const fetch = window.fetch;
const methods = ["get", "post", "put", "delete"];

const definition = {
  isLoading: types.boolean
};

const actions = self => {
  const validateOptions = ({ options = {}, expectedMethod }) => {
    return true;
  };

  const CRUD = methods.reduce((acc, method) => {
    acc[method] = flow(function*(url, options = {}) {
      if (!validateOptions(options)) {
        return;
      }

      self.isLoading = true;

      const response = yield axios({
        method,
        url
      });

      self.isLoading = false;

      return response;
    });

    return acc;
  }, {});

  return CRUD;
};

export const Async = types.model(definition).actions(actions);
