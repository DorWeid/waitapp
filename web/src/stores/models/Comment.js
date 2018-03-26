import { types } from "mobx-state-tree";

const definition = {
  userId: types.identifier(types.string),
  content: types.optional(types.string, ""),
  rating: types.optional(types.number, 0),
  picture_url: types.optional(types.string, ""),
  username: types.optional(types.string, "")
};

const views = self => {
  return {};
};

const actions = self => {
  return {};
};

const Comment = types
  .model(definition)
  .views(views)
  .actions(actions);

export default Comment;
