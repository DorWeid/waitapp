import { types, flow, getParent } from "mobx-state-tree";
import ItemModel from "./models/Item";

const definition = {
  items: types.optional(types.map(ItemModel), {}),
  latestListAdded: ""
};

const views = self => ({
  get shop() {
    return getParent(self, 1);
  }
});

const actions = self => {
  function updateItems(json) {
    json.forEach(itemJson => {
        self.items.put(itemJson)
    })
}

  const loadItems = flow(function* loadItems() {
    try {
      const result = yield self.shop.get(`/list/`);
      updateItems(result.data);
    
    } catch (error) {
      console.error('Couldnt fetch items', error)
    }
  });

  const getItem = flow(function* getItem(id) {
    const result = yield self.shop.get(`/list/${id}`);
    const converted = ItemModel.create(result.data);
    self.items.set(id, converted);
  });

  const addList = flow(function* addList(creator,type,meta,title,description,price,startDate,endDate) {
    const url = `/list/`;
    const options = {
      data: { creator,type,meta,title,description,price,startDate,endDate }
    };    
    const result  = yield self.shop.post(url, options);
    const list = ItemModel.create(result.data);    
    self.items.set(list._id, list);
    self.latestListAdded = list._id;
    return list;
  })

  return {
    loadItems,
    getItem,
    addList
  };
};

export const Item = types
  .model(definition)
  .views(views)
  .actions(actions);
