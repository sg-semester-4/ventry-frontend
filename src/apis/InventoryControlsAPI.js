import Axios from "axios";

class InventoryControlsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/iventoryControls`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/iventoryControls/${ID}`);
  }

  createOne(toCreateInventoryControl) {
    const {
      account_id,
      item_id,
      quantity,
      total_price,
    } = toCreateInventoryControl;
    return Axios.post(`${this.URL}/iventoryControls`, {
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
    return Axios.put(`${this.URL}/iventoryControls/${ID}`, {
      account_id,
      item_id,
      quantity,
      total_price,
    });
  }

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/iventoryControls/${ID}`);
  }
}

export default new InventoryControlsAPI();
