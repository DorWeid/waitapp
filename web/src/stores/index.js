import { types } from "mobx-state-tree";
import { Item as ItemStore } from "./Item";

const store = types
  .model("MainStore", {
    itemStore: types.optional(ItemStore, {
      items: {}
    })
  })
  .views(self => ({}))
  .actions(self => ({
    afterCreate() {}
  }));

export default store.create();
