import Axios from "axios";

class ProductCombinationsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/productCombinations`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/productCombinations/${ID}`);
  }

  createOne(toCreateProductCombination) {
    const { product_id, item_id } = toCreateProductCombination;
    return Axios.post(`${this.URL}/productCombinations`, {
      product_id,
      item_id,
    });
  }

  updateOneByID(ID, toUpdateProductCombination) {
    const { product_id, item_id } = toUpdateProductCombination;
    return Axios.put(`${this.URL}/productCombinations/${ID}`, {
      product_id,
      item_id,
    });
  }

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/productCombinations/${ID}`);
  }
}

export default new ProductCombinationsAPI();
