import { types } from "mobx-state-tree";

// The model definition
const definition = {
  id: types.identifier(types.string),
  name: types.optional(types.string, ""),
  description: types.optional(types.string, ""),
  price: types.optional(types.number, 0),
  originalPrice: types.optional(types.number, 0),
  currency: types.optional(types.string, "")
};

// Any fact that can be derived from the state in a pure manner should go here.
const views = self => {
  return {
    get describeMe() {
      return `
        ID: ${self.id} 
        Name: ${self.name} 
        Author: ${self.author} 
        Price: ${self.price}`;
    }
  };
};

// Modifying nodes can only be done by actions
// Simply put, state can be changed only by actions
// NOTE: Your async functions should probably go here
const actions = self => {
  return {
    changeName(newName) {
      self.name = newName;
    },
    enrollToItem(item) {
      window.alert("hey", item);
      debugger;
    }
  };
};

const Item = types
  .model(definition)
  .views(views)
  .actions(actions);

export default Item;
