import Axios from "axios";

class ForecastsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  ItemStockByID() {
    return Axios.get(`${this.URL}/forecasts/items/${ID}/stocks`);
  }

  ItemSalesByID(ID) {
    return Axios.get(`${this.URL}/forecasts/items/${ID}/sales`);
  }

  ProductSalesByID(ID) {
    return Axios.get(`${this.URL}/forecasts/products/${ID}/sales`);
  }
}

export default new ForecastsAPI();
