import Axios from "axios";

class AccountsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readAll() {
    return Axios.get(`${this.URL}/accounts`);
  }

  readByID(ID) {
    return Axios.get(`${this.URL}/accounts/${ID}`);
  }

  create(toCreateAccount) {
    const { name, email, password } = toCreateAccount;
    return Axios.post(`${this.URL}/accounts`, {
      name,
      email,
      password,
    });
  }

  updateByID(ID, toUpdateAccount) {
    const { name, email, password } = toUpdateAccount;
    return Axios.put(`${this.URL}/accounts/${ID}`, {
      name,
      email,
      password,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/accounts/${ID}`);
  }
}

export default new AccountsAPI();
