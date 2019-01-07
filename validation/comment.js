const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  //How to deal with form fields as name not entered at all?
  //Use our isEmpty implmentation
  //Assign an empty string if its really empty(null, undefined etc)
  data.text = !isEmpty(data.text) ? data.text : "";

  //
  //Data.text
  //
  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Comment text should be between 10 and 300 charcaters long";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Comment text is required";
  }
  //
  return { errors, isValid: isEmpty(errors) };
};
