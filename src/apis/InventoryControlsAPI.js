import Axios from "axios";

class InventoryControlsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/histories/inventoryControls`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/histories/inventoryControls/${ID}`);
  }

  createOne(toCreateInventoryControl) {
    const {
      account_id,
      item_id,
      quantity,
      total_price,
    } = toCreateInventoryControl;
    return Axios.post(`${this.URL}/histories/inventoryControls`, {
      account_id,
      item_id,
      quantity,
      total_price,
    });
  }

  updateOneByID(ID, toUpdateInventoryControl) {
    const {
      account_id,
      item_id,
      quantity,
      total_price,
    } = toUpdateInventoryControl;
    return Axios.put(`${this.URL}/histories/inventoryControls/${ID}`, {
      account_id,
      item_id,
      quantity,
      total_price,
    });
  }

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/histories/inventoryControls/${ID}`);
  }
}

export default new InventoryControlsAPI();
