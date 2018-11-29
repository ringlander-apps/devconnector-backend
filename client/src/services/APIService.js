import Axios from "axios";
import queryString from "querystring";

const apiClient = Axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  /**  PROFILE related methods  */
  /**
   *
   */
  getProfiles() {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/profile/all")
        .then(response => {
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  },
  /************************* */

  /**
   *
   * @param {*} userData
   */
  registerUser(userData) {
    return new Promise((resolve, reject) => {
      // const options = {
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   data: userData
      // };
      apiClient
        .post("/auth/register", userData)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
};
