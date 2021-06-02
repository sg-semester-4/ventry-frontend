import Axios from "axios";

class ItemCombinationsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/itemCombinations`);
  }

  readByID(ID) {
    return Axios.get(`${this.URL}/itemCombinations/${ID}`);
  }

  create(toCreateItemCombination) {
    const {
      parentItemID: parent_item_id,
      childItemID: child_item_id,
    } = toCreateItemCombination;
    return Axios.post(`${this.URL}/itemCombinations`, {
      parent_item_id,
      child_item_id,
    });
  }

  updateByID(ID, toUpdateItemCombination) {
    const {
      parentItemID: parent_item_id,
      childItemID: child_item_id,
    } = toUpdateItemCombination;
    return Axios.put(`${this.URL}/itemCombinations/${ID}`, {
      parent_item_id,
      child_item_id,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/itemCombinations/${ID}`);
  }
}

export default new ItemCombinationsAPI();
