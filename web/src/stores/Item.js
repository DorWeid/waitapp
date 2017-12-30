import { types, flow, getParent } from "mobx-state-tree";
import { ItemModel } from "./models";

const definition = {
  items: types.map(ItemModel)
};

const views = self => ({
  get shop() {
    return getParent(self, 1);
  }
});

const actions = self => {
  const getItems = flow(function* getItems() {
    const result = yield self.shop.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    debugger;
    return result;
  });

  return {
    getItems
  };
};

export const Item = types
  .model(definition)
  .views(views)
  .actions(actions);
