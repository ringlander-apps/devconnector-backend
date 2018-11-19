const isEmpty = value => {
  //console.log("Checking the input value: " + value);
  if (value === undefined) {
    return true;
  }
  if (value === null) {
    return true;
  }
  if (
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  }
  /*value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);*/
};

module.exports = isEmpty;
