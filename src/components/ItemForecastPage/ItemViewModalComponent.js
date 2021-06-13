import React, { Component } from "react";
import { Modal, Nav } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Line } from "react-chartjs-2";
import moment from "moment";
import * as ForecastTool from "../../tools/Forecast";

import ForecastsAPI from "../../apis/ForecastsAPI";
import ItemCardImage from "../../assets/images/item-management-card-img.svg";
import "./Styles/ItemViewModalStyle.css";

class SalesComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleFetchForecast = () => {
    const { parent } = this.props;
    const { options } = parent.state;
    const { viewItemResponse } = parent.props.parent.state;

    ForecastsAPI.itemSalesByID(viewItemResponse.data.id, options)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;
        if (status === 200) {
          const tempData = ForecastTool.cleanData(data);
          parent.setState({
            observedData: tempData.observedData,
            forecastedData: tempData.forecastedData,
            forecastResponse: { status, message, data },
          });
        } else {
          parent.props.parent.refMessageModalComponent.setState({
            title: "Status",
            content: message,
          });
          parent.props.parent.refMessageModalComponent.handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
        parent.props.parent.refMessageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        parent.props.parent.refMessageModalComponent.handleShow();
      });
  };

  render() {
    const { parent } = this.props;
    const { forecastedData, observedData } = parent.state;
    const chartData = {
      datasets: [
        {
          label: "Observed",
          borderColor: "#36a2eb",
          lineTension: 0.1,
          borderDashOffset: 0.0,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: observedData,
        },
        {
          label: "Forecasted",
          borderColor: "#ff6384",
          lineTension: 0.1,
          borderDashOffset: 0.0,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: forecastedData,
        },
      ],
    };

    const lineOptions = {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              // unit: "month",
              tooltipFormat: "lll",
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            ticks: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            // stacked: true,
            gridLines: {
              display: true,
              drawBorder: false,
            },
            ticks: {
              display: true,
            },
          },
        ],
      },
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    };
    return (
      <div className="sub sales">
        <div className="graph">
          <Line data={chartData} options={lineOptions} />
        </div>
      </div>
    );
  }
}

class ControlsComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleFetchForecast = () => {
    const { parent } = this.props;
    const { options } = parent.state;
    const { viewItemResponse } = parent.props.parent.state;

    ForecastsAPI.itemControlsByID(viewItemResponse.data.id, options)
      .then((res) => {
        console.log(res);
        const { status, message, data } = res.data;
        if (status === 200) {
          const tempData = ForecastTool.cleanData(data);
          parent.setState({
            observedData: tempData.observedData,
            forecastedData: tempData.forecastedData,
            forecastResponse: { status, message, data },
          });
        } else {
          parent.props.parent.refMessageModalComponent.setState({
            title: "Status",
            content: message,
          });
          parent.props.parent.refMessageModalComponent.handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
        parent.props.parent.refMessageModalComponent.setState({
          title: "Status",
          content: "Error has occurred",
        });
        parent.props.parent.refMessageModalComponent.handleShow();
      });
  };

  render() {
    const { parent } = this.props;
    const { forecastedData, observedData } = parent.state;
    const chartData = {
      datasets: [
        {
          label: "Observed",
          borderColor: "#36a2eb",
          lineTension: 0.1,
          borderDashOffset: 0.0,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: observedData,
        },
        {
          label: "Forecasted",
          borderColor: "#ff6384",
          lineTension: 0.1,
          borderDashOffset: 0.0,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: forecastedData,
        },
      ],
    };

    const lineOptions = {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              // unit: "month",
              tooltipFormat: "lll",
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            ticks: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            // stacked: true,
            gridLines: {
              display: true,
              drawBorder: false,
            },
            ticks: {
              display: true,
            },
          },
        ],
      },
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    };
    return (
      <div className="sub controls">
        <div className="graph">
          <Line data={chartData} options={lineOptions} />
        </div>
      </div>
    );
  }
}

class ItemViewModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      menu: "sales",
      options: {
        interval: "D",
        periods: 7,
      },
      observedData: [],
      forecastedData: [],
      forecastResponse: {},
    };
  }

  handleShow = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  };

  handleSelectMenu = (eventKey, e) => {
    this.setState({
      menu: eventKey,
      observedData: [],
      forecastedData: [],
      forecastResponse: {},
    });
  };

  handleSubmitOptions = (values, actions) => {
    this.setState({ options: values });
    this.refForecastComponent.handleFetchForecast();
    actions.setSubmitting(false);
  };

  render() {
    const { isShow, menu, options, forecastResponse } = this.state;
    const { parent } = this.props;

    return (
      <Modal
        show={isShow}
        onHide={this.handleShow}
        centered
        className="component item-view-modal"
        size="lg"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Item Forecast Details</Modal.Title>
        </Modal.Header>

        <Nav variant="tabs" onSelect={this.handleSelectMenu}>
          <Nav.Item>
            <Nav.Link eventKey="sales">Sales</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="controls">Controls</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="coming-soon" disabled>
              Coming Soon
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Modal.Body className="body">
          <div className="options">
            <Formik
              initialValues={options}
              onSubmit={this.handleSubmitOptions}
              enableReinitialize
            >
              {(props) => (
                <Form>
                  <fieldset className="form-group">
                    <label htmlFor="interval">Interval</label>
                    <Field
                      className="custom-select"
                      as="select"
                      name="interval"
                    >
                      <option value="D">Day</option>
                      <option value="W">Week</option>
                      <option value="M">Month</option>
                    </Field>
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="periods">Periods</label>
                    <Field
                      className="form-control"
                      type="number"
                      name="periods"
                    />
                  </fieldset>
                  <button type="submit" className="btn btn-outline-primary">
                    Forecast
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {
            // Menu switch.
            {
              sales: (
                <SalesComponent
                  parent={this}
                  ref={(ref) => {
                    this.refForecastComponent = ref;
                  }}
                />
              ),
              controls: (
                <ControlsComponent
                  parent={this}
                  ref={(ref) => {
                    this.refForecastComponent = ref;
                  }}
                />
              ),
            }[menu]
          }
          {forecastResponse.data ? (
            <div className="metrics">
              <div className="r2">R^2: {forecastResponse.data.r2}</div>
              <div className="mse">MSE: {forecastResponse.data.mse}</div>
            </div>
          ) : null}
        </Modal.Body>

        <Modal.Footer className="footer d-none">
          <button type="button" className="btn btn-primary ">
            Action
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ItemViewModalComponent;
