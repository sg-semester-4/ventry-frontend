import Axios from "axios";

class ProductTransactionsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/histories/productTransactions`);
  }

  readOneByID(ID) {
    return Axios.get(`${this.URL}/histories/productTransactions/${ID}`);
  }

  createOne(toCreateProductTransaction) {
    const {
      account_id,
      product_id,
      quantity,
      total_sell_price,
    } = toCreateProductTransaction;
    return Axios.post(`${this.URL}/histories/productTransactions`, {
      account_id,
      product_id,
      quantity,
      total_sell_price,
    });
  }

  updateOneByID(ID, toUpdateProductTransaction) {
    const {
      account_id,
      product_id,
      quantity,
      total_sell_price,
    } = toUpdateProductTransaction;
    return Axios.put(`${this.URL}/histories/productTransactions/${ID}`, {
      account_id,
      product_id,
      quantity,
      total_sell_price,
    });
  }

  deleteOneByID(ID) {
    return Axios.delete(`${this.URL}/histories/productTransactions/${ID}`);
  }
}

export default new ProductTransactionsAPI();
