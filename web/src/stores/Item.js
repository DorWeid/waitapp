import { types, flow, getParent } from "mobx-state-tree";
import ItemModel from "./models/Item";

const definition = {
  items: types.optional(types.map(ItemModel), {})
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

  const getItem = flow(function* getItem(id) {
    const result = yield self.shop.get(`/list/${id}`);
    const converted = ItemModel.create(result.data);
    self.items.set(id, converted);
  });

  return {
    getItems,
    getItem
  };
};

export const Item = types
  .model(definition)
  .views(views)
  .actions(actions);
