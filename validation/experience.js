const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  //How to deal with form fields as name not entered at all?
  //Use our isEmpty implmentation
  //Assign an empty string if its really empty(null, undefined etc)
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }
  ///

  return { errors, isValid: isEmpty(errors) };
};
