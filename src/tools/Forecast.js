const cleanData = (data) => {
  const tempData = {
    observedData: data.observed,
    forecastedData: data.forecasted,
  };

  const sortData = Object.keys(tempData).map((itm, idx) => [
    itm,
    tempData[itm].length,
  ]);

  sortData.sort((a, b) => b[1] - a[1]);
  for (let i = 1; i < sortData.length; i += 1) {
    for (let j = sortData[i][1]; j < sortData[0][1]; j += 1) {
      tempData[sortData[i][0]].push({
        x: tempData[sortData[0][0]][j].x,
        y: null,
      });
    }
  }

  return tempData;
};

export { cleanData };
