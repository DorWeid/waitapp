import { types } from "mobx-state-tree";
import { ItemModel } from "./models";

export const Item = types
  .model("ItemStore", {
    isLoading: true,
    items: types.map(ItemModel)
  })
  .views(self => ({}))
  .actions(self => ({}));
