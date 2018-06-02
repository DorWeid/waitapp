import {types, flow, getParent} from "mobx-state-tree";
import ItemModel from "./models/Item";
import {categories} from "./models/Item";

const Category = types.model("Category", {
  en: types.string,
  he: types.string
});

const definition = {
  items: types.optional(types.map(ItemModel), {}),
  categories: types.optional(types.array(Category), []),
  latestListAdded: "",
  currDisplayedCatergory: "hotel"
};

const views = self => ({
  get store() {
    return getParent(self, 1);
  }
});

const actions = self => {
  function updateItems(json) {
    self
      .items
      .clear();

    json.forEach(itemJson => {
      self
        .items
        .put(itemJson);
    });
  }

  const loadItems = flow(function * loadItems() {
    try {
      const result = yield self
        .store
        .get(`/list`);
      updateItems(result.data);
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  const getItem = flow(function * getItem(id) {
    const result = yield self
      .store
      .get(`/list/${id}`);
    const converted = ItemModel.create(result.data);
    self
      .items
      .set(id, converted);
  });

  const addList = flow(function * addList(type, meta, title, description, price, location, startDate, endDate, amount, files, listEndDate) {
    const url = `/list/`;
    const options = {
      data: {
        type,
        meta,
        title,
        description,
        price,
        startDate,
        endDate,
        location,
        amount,
        images: files,
        listEndDate,
      }
    };
    const result = yield self
      .store
      .post(url, options);
    const list = ItemModel.create(result.data);
    self
      .items
      .set(list._id, list);
    self.latestListAdded = list._id;
    return list;
  });

  const loadCategories = () => {
    self.categories = categories;
  };

  const clearLatest = () => {
    self.latestListAdded = "";
  };

  const changeCurrentCategory = category => {
    self.currDisplayedCatergory = category.en;
  };

  const getListsOfCategory = flow(function * getListsOfCategory(type) {
    try {
      const result = yield self
        .store
        .get(`/list?type=${type}`);
      updateItems(result.data);
    } catch (error) {
      console.error("Couldnt fetch items", error);
    }
  });

  return {
    loadItems,
    getItem,
    addList,
    loadCategories,
    getListsOfCategory,
    clearLatest,
    changeCurrentCategory
  };
};

export const Item = types
  .model(definition)
  .views(views)
  .actions(actions);
