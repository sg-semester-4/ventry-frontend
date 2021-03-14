import React, { Component, Fragment } from "react";
import TodosUpdateComponent from "./TodosUpdateComponent";

class CategoryTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div className="component category-table">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Modify</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((category, i) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <button type="submit" className="btn btn-outline-primary">
                      Modify
                    </button>
                  </td>
                  <td>
                    <button type="submit" className="btn btn-outline-primary">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CategoryTableComponent;
