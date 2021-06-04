import Axios from "axios";

class InventoryControlsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/iventoryControls`);
  }

  readByID(ID) {
    return Axios.get(`${this.URL}/iventoryControls/${ID}`);
  }

  create(toCreateInventoryControl) {
    const {
      accountID: account_id,
      itemID: item_id,
      quantity,
      totalPrice: total_price,
    } = toCreateInventoryControl;
    return Axios.post(`${this.URL}/iventoryControls`, {
      account_id,
      item_id,
      quantity,
      total_price,
    });
  }

  updateByID(ID, toUpdateInventoryControl) {
    const {
      accountID: account_id,
      itemID: item_id,
      quantity,
      totalPrice: total_price,
    } = toUpdateInventoryControl;
    return Axios.put(`${this.URL}/iventoryControls/${ID}`, {
      account_id,
      item_id,
      quantity,
      total_price,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/iventoryControls/${ID}`);
  }
}

export default new InventoryControlsAPI();
