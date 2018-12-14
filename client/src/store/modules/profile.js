import {
  GET_PROFILE_REQUEST,
  GET_PROFILES_REQUEST,
  CLEAR_PROFILE_REQUEST,
  CREATE_PROFILE_REQUEST,
  DELETE_PROFILE_REQUEST
} from "../actions/profile";
import APIService from "@/services/APIService";

const state = {
  profile: null,
  profiles: null,
  loading: false,
  profileErrors: {},
  socialErrors: {}
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
  },
  PROFILE_ERROR_HANDLE: state => {
    const { handle } = state.profileErrors;
    return handle !== "" ? handle : "";
  },
  PROFILE_ERROR_WEBSITE: state => {
    const { website } = state.profileErrors;
    return website !== "" ? website : "";
  },
  PROFILE_ERROR_SKILLS: state => {
    const { skills } = state.profileErrors;
    return skills !== "" ? skills : "";
  },
  PROFILE_ERROR_TWITTER: state => {
    const { twitter } = state.profileErrors;
    return twitter !== "" ? twitter : "";
  },
  PROFILE_ERROR_FB: state => {
    const { facebook } = state.profileErrors;
    return facebook !== "" ? facebook : "";
  },
  PROFILE_ERROR_LINKEDIN: state => {
    const { linkedin } = state.profileErrors;
    return linkedin !== "" ? linkedin : "";
  },
  PROFILE_ERROR_YOUTUBE: state => {
    const { youtube } = state.profileErrors;
    return youtube !== "" ? youtube : "";
  },
  PROFILE_ERROR_INSTAGRAM: state => {
    const { instagram } = state.profileErrors;
    return instagram !== "" ? instagram : "";
  },
  PROFILE_ERROR_YOUTUBE: state => {
    const { youtube } = state.profileErrors;
    return youtube !== "" ? youtube : "";
  },
  PROFILE_SOCIAL_ERRORS: state => {
    return state.socialErrors;
  },

  PROFILE_ERROR_STATUS: state => {
    const { status } = state.profileErrors;
    return status !== "" ? status : "";
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
  },
  SET_PROFILE_ERRORS: (state, payload) => {
    state.profileErrors = payload;
  },
  RESET_PROFILE_ERRORS: state => {
    state.profileErrors = {};
  }
};
const actions = {
  [CREATE_PROFILE_REQUEST]: ({ commit }, userProfile) => {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true);
      APIService.createProfile(userProfile)
        .then(response => {
          commit("SET_CURRENT_PROFILE", response.data);
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          commit("SET_PROFILE_ERRORS", err.response.data);
          reject({ status: 400, success: false });
        });
      commit("SET_LOADING", false);
      commit("RESET_PROFILE_ERRORS");
    });
  },
  [DELETE_PROFILE_REQUEST]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true);
      APIService.deleteProfile()
        .then(response => {
          commit("SET_CURRENT_PROFILE", null);
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          reject(err.response);
        });
    });
  },
  /***
   *
   */
  [GET_PROFILE_REQUEST]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit("SET_LOADING", true);
      APIService.getProfile()
        .then(response => {
          //SET CURRENT PROFILE
          commit("SET_CURRENT_PROFILE", response.data);
        })
        .catch(err => {
          // console.log("Error here");
          // if (err.response.status === 404) {
          //   commit("SET_CURRENT_PROFILE", {});
          // }
          commit("SET_CURRENT_PROFILE", {});
        });
      commit("SET_LOADING", false);
    });
  },
  /***
   *
   */
  [CLEAR_PROFILE_REQUEST]: ({ commit }) => {
    commit("SET_CURRENT_PROFILE", null);
    commit("SET_LOADING", false);
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
