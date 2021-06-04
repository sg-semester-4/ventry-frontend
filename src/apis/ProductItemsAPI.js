import Axios from "axios";

class ProductCombinationsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/productCombinations`);
  }

  readByID(ID) {
    return Axios.get(`${this.URL}/productCombinations/${ID}`);
  }

  create(toCreateProductCombination) {
    const {
      productID: product_id,
      itemID: item_id,
    } = toCreateProductCombination;
    return Axios.post(`${this.URL}/productCombinations`, {
      product_id,
      item_id,
    });
  }

  updateByID(ID, toUpdateProductCombination) {
    const {
      productID: product_id,
      itemID: item_id,
    } = toUpdateProductCombination;
    return Axios.put(`${this.URL}/productCombinations/${ID}`, {
      product_id,
      item_id,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/productCombinations/${ID}`);
  }
}

export default new ProductCombinationsAPI();
