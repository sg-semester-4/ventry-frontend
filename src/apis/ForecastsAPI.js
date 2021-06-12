import Axios from "axios";

class ForecastsAPI {
  URL = process.env.REACT_APP_API_URL_FORECAST;

  itemStocksByID(ID, options) {
    const { interval, periods } = options;
    return Axios.post(`${this.URL}/forecasts/items/${ID}/stocks`, {
      interval,
      periods,
    });
  }

  itemSalesByID(ID, options) {
    const { interval, periods } = options;
    return Axios.post(`${this.URL}/forecasts/items/${ID}/sales`, {
      interval,
      periods,
    });
  }

  productSalesByID(ID, options) {
    const { interval, periods } = options;
    return Axios.post(`${this.URL}/forecasts/products/${ID}/sales`, {
      interval,
      periods,
    });
  }
}

export default new ForecastsAPI();
