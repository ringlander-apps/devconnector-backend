const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  //How to deal with form fields as name not entered at all?
  //Use our isEmpty implmentation
  //Assign an empty string if its really empty(null, undefined etc)
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School title field is required";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }
  ///

  return { errors, isValid: isEmpty(errors) };
};
