import Axios from "axios";

class ProductCombinationsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/productItems`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/productItems/${ID}`);
  }

  createOne(toCreateProductCombination) {
    const { product_id, item_id, quantity } = toCreateProductCombination;
    return Axios.post(`${this.URL}/productItems`, {
      product_id,
      item_id,
      quantity,
    });
  }

  updateOneByID(ID, toUpdateProductCombination) {
    const { product_id, item_id, quantity } = toUpdateProductCombination;
    return Axios.put(`${this.URL}/productItems/${ID}`, {
      product_id,
      item_id,
      quantity,
    });
  }

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/productItems/${ID}`);
  }
}

export default new ProductCombinationsAPI();
