import Axios from "axios";

class BookAPI {
  URL = process.env.REACT_APP_API_URL_MANAGEMENT;

  readByID(ID) {
    return Axios.get(`${this.URL}/test/${ID}`);
  }

  readAll() {
    return Axios.get(`${this.URL}/test`);
  }

  readCustomByID(ID) {
    return Axios.get(`${this.URL}/test-custom/${ID}`);
  }

  readAllCustom() {
    return Axios.get(`${this.URL}/test-custom`);
  }

  create(newBook) {
    const { name, description, stock, image, categoryID } = newBook;
    return Axios.post(`${this.URL}/test`, {
      name,
      description,
      stock,
      image,
      category_id: categoryID,
    });
  }

  updateByID(ID, bookToUpdate) {
    const { name, description, stock, image, categoryID } = bookToUpdate;
    return Axios.put(`${this.URL}/test/${ID}`, {
      name,
      description,
      stock,
      image,
      category_id: categoryID,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/test/${ID}`);
  }
}

export default new BookAPI();
