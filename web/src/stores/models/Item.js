import { types } from "mobx-state-tree";

// The model definition
const definition = {
  id: types.identifier(),
  name: types.string,
  author: types.string,
  price: types.number
};

// Any fact that can be derived from the state in a pure manner should go here.
const views = self => {
  return {
    get description() {
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
    }
  };
};

export const Item = types
  .model(definition)
  .views(views)
  .actions(actions);
