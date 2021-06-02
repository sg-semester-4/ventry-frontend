import React, { Component, Fragment } from "react";
import { Formik, Form } from "formik";
// import BookAPI from "../api/BookAPI";
import BookListComponent from "../components/BookListComponent";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleSubmit = (val) => {
    const { name, description, stock, image, categoryID } = val;
    // BookAPI.create({ name, description, stock, image, categoryID })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     this.handleFetch();
    //   });
  };

  handleFetch = () => {
    // BookAPI.readAllCustom()
    //   .then((res) => {
    //     const data = res.data.map((item, index) => {
    //       return {
    //         bookID: item.book_id,
    //         categoryID: item.category_id,
    //         bookName: item.book_name,
    //         categoryName: item.category_name,
    //         bookDescription: item.book_description,
    //         bookStock: item.book_stock,
    //         bookImage: item.book_image,
    //       };
    //     });
    //     this.setState({ bookData: data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  render() {
    const { bookData } = this.state;
    return (
      <div className="page home container">
        <h1>Home Page</h1>

        <div className="container my-5">
          <BookListComponent data={bookData} />
        </div>
      </div>
    );
  }
}

export default HomePage;
