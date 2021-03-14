import React, { Component, Fragment } from "react";
import BookCardComponent from "../components/BookCardComponent";

class BookListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      categoryData: [],
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.data) {
      const categoryData = [];
      nextProps.data.forEach((item) => {
        if (!categoryData.includes(item.categoryName)) {
          categoryData.push(item.categoryName);
        }
      });
      return { data: nextProps.data, categoryData: categoryData };
    }
  };

  render() {
    const { data, categoryData } = this.state;

    return (
      <div className="component todos-table container">
        {categoryData.map((itemCategory, index) => {
          return (
            <div key={index} className="my-5">
              <h2>{itemCategory}</h2>
              <div className="d-md-flex m-3">
                {data.map((itemBook, index) => {
                  if (itemBook.categoryName == itemCategory) {
                    return <BookCardComponent key={index} data={itemBook} />;
                  }
                })}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default BookListComponent;
