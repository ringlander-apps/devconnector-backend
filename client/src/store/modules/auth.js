import {
  REGISTER_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGOUT_USER_REQUEST
} from "../actions/auth";

import APIService from "@/services/APIService";
import jwt_decode from "jwt-decode";
import isEmpty from "@/validation/is-empty";

const state = {
  isAuthenticated: !isEmpty(jwt_decode(localStorage.getItem("devcon-token"))),
  user: jwt_decode(localStorage.getItem("devcon-token")),
  accessToken: localStorage.getItem("devcon-token"),
  expiresAt: localStorage.getItem("devcon-token-expires_at"),

  authErrors: {},
  loginErrors: {}
};
const getters = {
  IS_AUTHENTICATED: state => {
    return state.isAuthenticated;
  },
  USER: state => {
    return state.user;
  },
  AUTH_ERROR_NAME: state => {
    const { name } = state.authErrors;
    return name !== "" ? name : "";
  },
  AUTH_ERROR_EMAIL: state => {
    const { email } = state.authErrors;
    return email !== "" ? email : "";
  },
  AUTH_ERROR_PW: state => {
    const { password } = state.authErrors;
    return password !== "" ? password : "";
  },
  AUTH_ERROR_PW2: state => {
    const { password2 } = state.authErrors;
    return password2 !== "" ? password2 : "";
  },
  LOGIN_ERROR_EMAIL: state => {
    const { email } = state.loginErrors;
    return email !== "" ? email : "";
  },
  LOGIN_ERROR_PW: state => {
    const { password } = state.loginErrors;
    return password !== "" ? password : "";
  }
};
const mutations = {
  SET_CURRENT_USER: (state, payload) => {
    state.isAuthenticated = !isEmpty(payload);
    state.user = payload;
  },
  SET_AUTH_ERRORS: (state, errors) => {
    state.authErrors = errors;
  },
  RESET_AUTH_ERRORS: state => {
    state.authErrors = {};
  },
  SET_LOGIN_ERRORS: (state, errors) => {
    state.loginErrors = errors.errors;
  },
  RESET_LOGIN_ERRORS: state => {
    state.loginErrors = {};
  },
  SET_TOKEN_DATA: (state, authData) => {
    if (authData) {
      localStorage.setItem("devcon-token", JSON.stringify(authData.token));
      localStorage.setItem(
        "devcon-token-expires_at",
        JSON.stringify(authData.expires_at)
      );
    } else {
      localStorage.removeItem("devcon-token");
      localStorage.removeItem("devcon-token-expires_at");
    }
  }
};
const actions = {
  /**
   * ACTION which registers a new user
   */
  [REGISTER_USER_REQUEST]: ({ commit }, userData) => {
    return new Promise((resolve, reject) => {
      APIService.registerUser(userData)
        .then(result => {
          commit("RESET_AUTH_ERRORS");
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          commit("SET_AUTH_ERRORS", err.response.data);
          reject({ status: 400, success: false });
        });
    });
  },
  /**
   * ACTION logging in the user by calling the axios api client wrapper APIService
   * Upon successful login, access_token is stored in local storage, user data is decoded from the token
   * User is authenticated
   */
  [LOGIN_USER_REQUEST]: ({ commit }, userData) => {
    return new Promise((resolve, reject) => {
      APIService.loginUser(userData)
        .then(result => {
          //Get the token
          const { token } = result.data;
          //SetAuthToken on APIService calls
          APIService.setAuthToken(token);
          //Commit mutation
          commit("SET_TOKEN_DATA", result.data);
          //Decode user information from the token
          commit("SET_CURRENT_USER", jwt_decode(token));
          commit("RESET_LOGIN_ERRORS");
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          console.log(err.response);
          commit("SET_LOGIN_ERRORS", err.response.data);
          reject({ status: 400, success: false });
        });
    });
  },
  /**
   * ACTTION which should log out the current user
   * That means:
   * Remove token information from the default.headers in the axios api client ()
   * Clear out token data from localStorage
   * Set current user to null
   */
  [LOGOUT_USER_REQUEST]: ({ commit }) => {
    console.log("Here");
    APIService.setAuthToken("");
    commit("SET_TOKEN_DATA", null);
    commit("SET_CURRENT_USER", null);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
