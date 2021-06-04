import Axios from "axios";

class ItemsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/items`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/items/${ID}`);
  }

  createOne(toCreateItem) {
    const {
      code,
      name,
      description,
      quantity,
      max_quantity,
      unit_type,
      unit_cost_price,
      image_url,
      account_id,
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

  updateOneByID(ID, toUpdateItem) {
    const {
      code,
      name,
      description,
      quantity,
      max_quantity,
      unit_type,
      unit_cost_price,
      image_url,
      account_id,
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

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/items/${ID}`);
  }
}

export default new ItemsAPI();
