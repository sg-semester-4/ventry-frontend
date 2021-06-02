import React, { Component, Fragment } from "react";
import { Formik, Form } from "formik";
import CategoryAddFormComponent from "../components/CategoryAddFormComponent.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = () => {
    // BookAPI.readAll()
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ categoryData: res.data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  handleSubmitAdd = (val) => {
    const { name } = val;
    // BookAPI.create({ name })
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

  render() {
    const { categoryData } = this.state;
    return (
      <div className="page books-management container">
        <h1>Books Management Page</h1>

        <div>
          <button type="submit" className="btn btn-outline-primary mx-3">
            Add
          </button>
          <button type="submit" className="btn btn-outline-primary mx-3">
            Modify
          </button>
          <button type="submit" className="btn btn-outline-primary mx-3">
            Remove
          </button>
        </div>

        <div className="container w-50 my-5">
          {JSON.stringify(categoryData)}
        </div>

        <div className="container w-50 my-5">
          <CategoryAddFormComponent onSubmit={this.handleSubmitAdd} />
        </div>
      </div>
    );
  }
}

export default HomePage;
