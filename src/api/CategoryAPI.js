import Axios from "axios";

class CategoryAPI {
  URL = process.env.REACT_APP_API_URL;

  readByID(ID) {
    return Axios.get(`${this.URL}/categories/${ID}`);
  }

  readAll() {
    return Axios.get(`${this.URL}/categories`);
  }

  create(newCategory) {
    const { name } = newCategory;
    return Axios.post(`${this.URL}/categories`, { name });
  }

  updateByID(ID, categoryToUpdate) {
    const { name } = categoryToUpdate;
    return Axios.put(`${this.URL}/categories/${ID}`, { name });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/categories/${ID}`);
  }
}

export default new CategoryAPI();
