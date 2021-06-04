import Axios from "axios";

class ItemsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/items`);
  }

  readByID(ID) {
    return Axios.get(`${this.URL}/items/${ID}`);
  }

  create(toCreateItem) {
    const {
      code,
      name,
      description,
      quantity,
      maxQuantity: max_quantity,
      unitType: unit_type,
      unitCostPrice: unit_cost_price,
      imageURL: image_url,
      accountID: account_id,
    } = toCreateItem;
    return Axios.post(`${this.URL}/items`, {
      code,
      name,
      description,
      quantity,
      max_quantity,
      unit_type,
      unit_cost_price,
      image_url,
      account_id,
    });
  }

  updateByID(ID, toUpdateItem) {
    const {
      code,
      name,
      description,
      quantity,
      maxQuantity: max_quantity,
      unitType: unit_type,
      unitCostPrice: unit_cost_price,
      imageURL: image_url,
      accountID: account_id,
    } = toUpdateItem;
    return Axios.put(`${this.URL}/items/${ID}`, {
      code,
      name,
      description,
      quantity,
      max_quantity,
      unit_type,
      unit_cost_price,
      image_url,
      account_id,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/items/${ID}`);
  }
}

export default new ItemsAPI();
