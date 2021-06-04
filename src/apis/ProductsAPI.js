import Axios from "axios";

class ProductsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readOneAll() {
    return Axios.get(`${this.URL}/products`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/products/${ID}`);
  }

  createOne(toCreateProduct) {
    const {
      code,
      name,
      description,
      quantity,
      unit_type,
      unit_sell_price,
      unit_cost_price,
      image_url,
      account_id,
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

  updateOneByID(ID, toUpdateProduct) {
    const {
      code,
      name,
      description,
      quantity,
      unit_type,
      unit_sell_price,
      unit_cost_price,
      image_url,
      account_id,
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

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/products/${ID}`);
  }
}

export default new ProductsAPI();
