import React, { Component, Fragment } from "react";
import { Formik, Form } from "formik";
import { Line } from "react-chartjs-2";
import moment from "moment";
import TestAPI from "../api/TestAPI";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      observedData: [],
      forecasted2Data: [],
      forecasted1Data: [],
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = () => {
    TestAPI.readAll()
      .then((res) => {
        const { fetchData } = res.data;
        const data = {
          forecasted1Data: fetchData.forecasted1.map((itm, idx) => {
            return { x: itm.timestamp, y: itm.value };
          }),
          forecasted2Data: fetchData.forecasted2.map((itm, idx) => {
            return { x: itm.timestamp, y: itm.value };
          }),
          observedData: fetchData.observed.map((itm, idx) => {
            return { x: itm.timestamp, y: itm.value };
          }),
        };

        const sortData = Object.keys(data).map((itm, idx) => [
          itm,
          data[itm].length,
        ]);

        sortData.sort((a, b) => b - a);
        for (let i = 1; i < sortData.length; i += 1) {
          for (let j = sortData[i][1]; j < sortData[0][1]; j += 1) {
            data[sortData[i][0]].push({
              x: data[sortData[0][0]][j].x,
              y: null,
            });
          }
        }

        this.setState({ ...data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getSingleProp = (prop, data) => {
    const extractedData = data.map((i) => {
      return { y: i[prop], x: i.time };
    });

    return extractedData;
  };

  render() {
    const { forecasted1Data, forecasted2Data, observedData } = this.state;
    const chartData = {
      datasets: [
        {
          label: "forecasted1",
          borderColor: "green",
          lineTension: 0.1,
          borderDashOffset: 0.0,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: forecasted1Data,
        },
        {
          label: "forecasted2",
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
          data: forecasted2Data,
        },
        {
          label: "observed",
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
          data: observedData,
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
      <div className="page Test container">
        <h1>Test Page</h1>
        <Line data={chartData} options={lineOptions} />
        {JSON.stringify({
          o: observedData.length,
          f1: forecasted1Data.length,
          f2: forecasted2Data.length,
        })}
      </div>
    );
  }
}

export default TestPage;
