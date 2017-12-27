import { types } from "mobx-state-tree";

export const Item = types.model("Item", {
  id: types.identifier(),
  name: types.string,
  author: types.string,
  price: types.number
});
