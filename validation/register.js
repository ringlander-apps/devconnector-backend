const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //How to deal with form fields as name not entered at all?
  //Use our isEmpty implmentation
  //Assign an empty string if its really empty(null, undefined etc)
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  /** data.name validation
   *
   */
  // First check the length of the string
  if (
    !validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  //Now check using the isEmpty of validator
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
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
   * password length min: 6, max: 30
   *
   */
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }
  ///
  /** data.password2 validation
   * empty string &
   * matches password
   *
   */
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "Password must match";
  }
  ///

  return { errors, isValid: isEmpty(errors) };
};
