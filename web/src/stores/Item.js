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
    const url = "https://jsonplaceholder.typicode.com/posts";
    const temporaryResultExample = {
      id: id.toString(),
      name: "Sheraton",
      description: "Best hotel in the world...",
      price: 1500,
      originalPrice: 9999,
      currency: "$"
    };

    const whatWeShouldDo = yield self.shop.get(`${url}/${id}`);
    if (temporaryResultExample) {
      const converted = ItemModel.create(temporaryResultExample);
      self.items.set(id, converted);
    }
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
