import { types } from "mobx-state-tree";

const definition = {
  userId: types.identifier(types.string),
  // date: types.optional(types.date, new Date()),
  email: types.optional(types.string, ""),
};

const views = self => {
  return {};
};

const actions = self => {
  return {};
};

const Subscribe = types
  .model(definition)
  .views(views)
  .actions(actions);

export default Subscribe;
