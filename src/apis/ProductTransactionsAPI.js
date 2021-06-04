import Axios from "axios";

class ProductTransactionsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/productTransactions`);
  }

  readByID(ID) {
    return Axios.get(`${this.URL}/productTransactions/${ID}`);
  }

  create(toCreateProductTransaction) {
    const {
      accountID: account_id,
      productID: product_id,
      quantity,
      totalSellPrice: total_sell_price,
    } = toCreateProductTransaction;
    return Axios.post(`${this.URL}/productTransactions`, {
      account_id,
      product_id,
      quantity,
      total_sell_price,
    });
  }

  updateByID(ID, toUpdateProductTransaction) {
    const {
      accountID: account_id,
      productID: product_id,
      quantity,
      totalSellPrice: total_sell_price,
    } = toUpdateProductTransaction;
    return Axios.put(`${this.URL}/productTransactions/${ID}`, {
      account_id,
      product_id,
      quantity,
      total_sell_price,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/productTransactions/${ID}`);
  }
}

export default new ProductTransactionsAPI();
