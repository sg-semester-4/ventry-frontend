import Axios from "axios";

class ForecastsAPI {
  URL = process.env.REACT_APP_API_URL_FORECAST;

  itemStockByID(ID) {
    return Axios.get(`${this.URL}/forecasts/items/${ID}/stocks`);
  }

  itemSalesByID(ID) {
    return Axios.get(`${this.URL}/forecasts/items/${ID}/sales`);
  }

  productSalesByID(ID) {
    return Axios.get(`${this.URL}/forecasts/products/${ID}/sales`);
  }
}

export default new ForecastsAPI();
