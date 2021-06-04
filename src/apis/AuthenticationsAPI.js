import Axios from "axios";

class AuthenticationsAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  register(credentials) {
    const { name, email, password } = credentials;
    return Axios.post(`${this.URL}/authentications/register`, {
      name,
      email,
      password,
    });
  }

  login(credentials) {
    const { email, password } = credentials;
    return Axios.post(`${this.URL}/authentications/login`, {
      email,
      password,
    });
  }
}

export default new AuthenticationsAPI();
