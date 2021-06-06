import Axios from "axios";

class ItemCombinationsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/itemCombinations`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/itemCombinations/${ID}`);
  }

  createOne(toCreateItemCombination) {
    const { parent_item_id, child_item_id, quantity } = toCreateItemCombination;
    return Axios.post(`${this.URL}/itemCombinations`, {
      parent_item_id,
      child_item_id,
      quantity,
    });
  }

  updateOneByID(ID, toUpdateItemCombination) {
    const { parent_item_id, child_item_id, quantity } = toUpdateItemCombination;
    return Axios.put(`${this.URL}/itemCombinations/${ID}`, {
      parent_item_id,
      child_item_id,
      quantity,
    });
  }

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/itemCombinations/${ID}`);
  }
}

export default new ItemCombinationsAPI();
