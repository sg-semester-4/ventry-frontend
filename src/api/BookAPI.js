import Axios from "axios";

class BookAPI {
  URL = process.env.REACT_APP_API_URL;

  readByID(ID) {
    return Axios.get(`${this.URL}/books/${ID}`);
  }

  readAll() {
    return Axios.get(`${this.URL}/books`);
  }

  readCustomByID(ID) {
    return Axios.get(`${this.URL}/books-custom/${ID}`);
  }

  readAllCustom() {
    return Axios.get(`${this.URL}/books-custom`);
  }

  create(newBook) {
    const { name, description, stock, image, categoryID } = newBook;
    return Axios.post(`${this.URL}/books`, {
      name,
      description,
      stock,
      image,
      category_id: categoryID,
    });
  }

  updateByID(ID, bookToUpdate) {
    const { name, description, stock, image, categoryID } = bookToUpdate;
    return Axios.put(`${this.URL}/books/${ID}`, {
      name,
      description,
      stock,
      image,
      category_id: categoryID,
    });
  }

  deleteByID(ID) {
    return Axios.delete(`${this.URL}/books/${ID}`);
  }
}

export default new BookAPI();
