import {
  REGISTER_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGOUT_USER_REQUEST
} from "../actions/auth";

import APIService from "@/services/APIService";

const state = {
  isAuthenticated: false,
  user: {},
  authErrors: {}
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
  }
};
const mutations = {
  SET_AUTHENTICATED: (state, payload) => {
    state.isAuthenticated = payload;
  },
  SET_CURRENT_USER: (state, user) => {
    state.user = user;
  },
  SET_AUTH_ERRORS: (state, errors) => {
    state.authErrors = errors;
  },
  RESET_AUTH_ERRORS: state => {
    state.authErrors = {};
  }
};
const actions = {
  [REGISTER_USER_REQUEST]: ({ commit }, userData) => {
    return new Promise((resolve, reject) => {
      APIService.registerUser(userData)
        .then(result => {
          commit("SET_CURRENT_USER", result);
          commit("RESET_AUTH_ERRORS");
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          commit("SET_AUTH_ERRORS", err.response.data);
          reject({ status: 400, success: false });
        });
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
