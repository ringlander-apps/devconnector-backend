const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //How to deal with form fields as name not entered at all?
  //Use our isEmpty implmentation
  //Assign an empty string if its really empty(null, undefined etc)
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  /** data.email validation
   * empty string &
   * valid email format
   */
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  ///
  /** data.password validation
   * empty string &
   *
   */
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  ///

  return { errors, isValid: isEmpty(errors) };
};
