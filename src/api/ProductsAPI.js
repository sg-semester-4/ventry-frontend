import Axios from "axios";

class ProductsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/products`);
  }

  readByID(ID) {
    return Axios.get(`${this.URL}/products/${ID}`);
  }

  create(toCreateProduct) {
    const {
      code,
      name,
      description,
      quantity,
      unitType: unit_type,
      unitSellPrice: unit_sell_price,
      unitCostProce: unit_cost_price,
      imageURL: image_url,
      accountID: account_id,
    } = toCreateProduct;
    return Axios.post(`${this.URL}/products`, {
      code,
      name,
      description,
      quantity,
      unit_type,
      unit_sell_price,
      unit_cost_price,
      image_url,
      account_id,
    });
  }

  updateByID(ID, toUpdateProduct) {
    const {
      code,
      name,
      description,
      quantity,
      unitType: unit_type,
      unitSellPrice: unit_sell_price,
      unitCostProce: unit_cost_price,
      imageURL: image_url,
      accountID: account_id,
    } = toUpdateProduct;
    return Axios.put(`${this.URL}/products/${ID}`, {
      code,
      name,
      description,
      quantity,
      unit_type,
      unit_sell_price,
      unit_cost_price,
      image_url,
      account_id,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/products/${ID}`);
  }
}

export default new ProductsAPI();
