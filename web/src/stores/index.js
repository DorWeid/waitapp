import { types } from "mobx-state-tree";
import { Item as ItemStore } from "./Item";

const store = types
  .model("MainStore", {
    itemStore: types.optional(ItemStore, {
      items: {
        myItem1: {
          id: "myItem1",
          name: "The Item 1 Name",
          author: "Dor",
          price: 1337
        }
      }
    })
  })
  .views(self => ({}))
  .actions(self => ({
    afterCreate() {}
  }));

export default store.create();
