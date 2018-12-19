import moment from "moment";
export default {
  formattedDate: date => {
    if (date) {
      return moment(date).format("YYYY-MM-DD");
    }
    return "Now";
  }
};
