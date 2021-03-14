import React, { Component, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import CategoryAPI from "../api/CategoryAPI";
import CategoryModifyFormComponent from "../components/CategoryModifyFormComponent.js";

class CategoryModifyFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValues: {
        ID: "ID",
        name: "Name",
      },
    };
  }
  handleChange = (e) => {
    this.setState({ categoryValues: { [e.target.name]: e.target.value } });
  };

  handleClick = (val) => {
    const { categoryValues } = this.state;
    this.props.onSubmit(categoryValues);
  };

  render() {
    const { onSubmit } = this.props;
    const { categoryValues } = this.props;

    return (
      <div className="component category-add-form">
        <Formik initialValues={categoryValues} enableReinitialize>
          {(props) => (
            <Form>
              <fieldset className="form-group">
                <label htmlFor="name">Input category name</label>
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </fieldset>
            </Form>
          )}
        </Formik>

        <button
          type="submit"
          className="btn btn-outline-primary mt-3"
          onClick={() => this.handleClick()}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default CategoryModifyFormComponent;
