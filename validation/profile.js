const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  //How to deal with form fields as name not entered at all?
  //Use our isEmpty implmentation
  //Assign an empty string if its really empty(null, undefined etc)
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // Data.handle validation
  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  //
  // Data.status validation
  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  //
  // Data.skills
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }
  //
  // Data.website
  //
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  //
  // Data.social
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  ///

  return { errors, isValid: isEmpty(errors) };
};
