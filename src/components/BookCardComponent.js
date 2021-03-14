import { isInteger } from "formik";
import React, { Component, Fragment } from "react";
import BookAPI from "../api/BookAPI";

class BookCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        bookID: "ID",
        categoryID: "ID",
        bookName: "Book name",
        categoryName: "Category name",
        bookDescription: "Description",
        bookStock: 0,
        bookImage:
          "http://brentapac.com/wp-content/uploads/2017/03/transparent-square.png",
      },
      defaultBookImage:
        "http://brentapac.com/wp-content/uploads/2017/03/transparent-square.png",
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!prevState.triggerSafe) {
      return {
        data: nextProps.data,
      };
    }
    return null;
  };

  handleFetch = () => {
    const { data } = this.state;
    const { bookID } = data;

    BookAPI.readCustomByID(bookID)
      .then((res) => {
        console.log(res);
        const data = {
          bookID: res.data.book_id,
          categoryID: res.data.category_id,
          bookName: res.data.book_name,
          categoryName: res.data.category_name,
          bookDescription: res.data.book_description,
          bookStock: res.data.book_stock,
          bookImage: res.data.book_image,
        };
        this.setState({ triggerSafe: true, data: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClickReturn = () => {
    const { data } = this.state;
    const {
      bookID,
      categoryID,
      bookName,
      bookDescription,
      bookStock,
      bookImage,
    } = data;

    BookAPI.updateByID(bookID, {
      name: bookName,
      description: bookDescription,
      stock: Number.parseInt(bookStock) + 1,
      image: bookImage,
      categoryID,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.handleFetch();
      });
  };

  handleClickBorrow = () => {
    const { data } = this.state;
    const {
      bookID,
      categoryID,
      bookName,
      bookDescription,
      bookStock,
      bookImage,
    } = data;

    BookAPI.updateByID(bookID, {
      name: bookName,
      description: bookDescription,
      stock: Number.parseInt(bookStock) - 1,
      image: bookImage,
      categoryID,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.handleFetch();
      });
  };

  render() {
    const { data, defaultBookImage } = this.state;

    return (
      <div className="component book-card card w-25 m-3">
        <img
          src={data.bookImage || defaultBookImage}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{data.bookName}</h5>
          <p className="card-text">{data.bookDescription}</p>
        </div>
        <div className="card-body">
          <p className="card-text">Stock: {data.bookStock}</p>
        </div>
        <div className="card-body">
          <button
            type="submit"
            className="card-link btn btn-outline-primary"
            onClick={() => this.handleClickBorrow()}
            disabled={data.bookStock <= 0}
          >
            Borrow
          </button>
          <button
            type="submit"
            className="card-link btn btn-outline-primary"
            onClick={() => this.handleClickReturn()}
          >
            Return
          </button>
        </div>
      </div>
    );
  }
}

export default BookCardComponent;
