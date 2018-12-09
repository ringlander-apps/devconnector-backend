import {
  GET_PROFILE_REQUEST,
  GET_PROFILES_REQUEST,
  CLEAR_PROFILE_REQUEST
} from "../actions/profile";
import APIService from "@/services/APIService";

const state = {
  profile: null,
  profiles: null,
  loading: false
};
const getters = {
  PROFILE: state => {
    return state.profile;
  },
  PROFILES: state => {
    return state.profiles;
  },
  LOADING: state => {
    return state.loading;
  }
};
const mutations = {
  SET_CURRENT_PROFILE: (state, payload) => {
    state.profile = payload;
  },
  SET_PROFILES: (state, payload) => {
    state.profiles = payload;
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  }
};
const actions = {
  /***
   *
   */
  [GET_PROFILE_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true);
      APIService.getProfile()
        .then(result => {
          //SET CURRENT PROFILE
          commit("SET_CURRENT_PROFILE", result.data);
          commit("SET_LOADING", false);
        })
        .catch(err => {
          if (err.response.status === 404) {
            commit("SET_CURRENT_PROFILE", {});
            commit("SET_LOADING", false);
          }
        });
    });
  },
  /***
   *
   */
  [CLEAR_PROFILE_REQUEST]: ({ commit }) => {
    commit("SET_CURRENT_PROFILE", null);
  },
  /***
   *
   */
  [GET_PROFILES_REQUEST]: ({ commit }, payload) => {}
};
export default {
  state,
  getters,
  mutations,
  actions
};
