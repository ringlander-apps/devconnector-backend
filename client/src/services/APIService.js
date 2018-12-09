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
  /**
   *
   */
  getProfile() {
    return new Promise((resolve, reject) => {
      console.log(apiClient);
      apiClient
        .get("/profile")
        .then(response => resolve(response.data))
        .catch(err => reject(err));
    });
  },
  /**
   *
   * @param {*} token
   */
  setAuthToken(token) {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = token;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  },
  /************************* */

  /**
   *
   * @param {*} userData
   */
  registerUser(userData) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/auth/register", userData)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  },
  /**
   *
   * @param {*} userData
   */
  loginUser(userData) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/auth/login", userData)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
