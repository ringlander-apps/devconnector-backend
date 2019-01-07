import {
  GET_POSTS_REQUEST,
  GET_POST_BY_ID_REQUEST,
  DELETE_POST_REQUEST,
  UPDATE_POST_REQUEST,
  CREATE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
  CLEAR_POSTS_REQUEST
} from "../actions/post";

import APIService from "@/services/APIService";

const state = {
  posts: [],
  post: {},
  postsLoading: false,
  postErrors: {},
  likeErrors: {},
  commentErrors: {}
};
const getters = {
  POSTS: state => {
    return state.posts;
  },
  POST: state => {
    return state.post;
  },
  POSTS_LOADING: state => {
    return state.postsLoading;
  },
  POST_ERRORS_TEXT: state => {
    const { text } = state.postErrors;
    return text !== "" ? text : "";
  },
  LIKE_ERRORS: state => {
    return state.likeErrors;
  },
  COMMENT_ERRORS_TEXT: state => {
    const { text } = state.commentErrors;
    return text !== "" ? text : "";
  }
};
const mutations = {
  SET_POSTS: (state, payload) => {
    state.posts = payload;
  },
  SET_POST: (state, payload) => {
    state.post = payload;
  },
  SET_POSTS_LOADING: (state, payload) => {
    state.postsLoading = payload;
  },
  SET_POST_ERRORS: (state, payload) => {
    state.postErrors = payload;
  },
  RESET_POST_ERRORS: state => {
    state.postErrors = {};
  },
  ADD_POST: (state, payload) => {
    state.posts = [payload, ...state.posts];
  },
  DELETE_POST: (state, payload) => {
    state.posts = state.posts.filter(post => post._id !== payload);
  },
  ADD_LIKE: (state, payload) => {
    state.posts.find(post => post._id === payload).likes.push();
  },
  SET_LIKE_ERRORS: (state, payload) => {
    state.likeErrors = payload;
  },
  RESET_LIKE_ERRORS: state => {
    state.likeErrors = {};
  },
  SET_COMMENT_ERRORS: (state, payload) => {
    state.commentErrors = payload;
  },
  RESET_COMMENT_ERRORS: state => {
    state.commentErrors = {};
  },
  ADD_COMMENT: (state, payload) => {
    //copy what's in comments using array spread, insert payload at index=0
    state.post.comments = [payload, ...state.post.comments];
  }
};
const actions = {
  /**
   *
   */
  [GET_POSTS_REQUEST]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit("SET_POSTS_LOADING", true);
      APIService.getPosts()
        .then(response => {
          commit("SET_POSTS", response.data);
          commit("SET_POSTS_LOADING", false);
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          commit("SET_POSTS", null);
          commit("SET_POSTS_LOADING", false);
          reject({ status: 400, success: false });
        });
    });
  },
  /**
   *
   */
  [GET_POST_BY_ID_REQUEST]: ({ commit }, postID) => {
    return new Promise((resolve, reject) => {
      commit("SET_POSTS_LOADING", true);
      commit("RESET_POST_ERRORS");
      commit("RESET_LIKE_ERRORS");
      APIService.getPostById(postID)
        .then(response => {
          commit("SET_POST", response.data);
          commit("SET_POSTS_LOADING", false);
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          commit("SET_POST_ERRORS", err.response.data);
          commit("SET_POSTS_LOADING", false);
          reject(err.response.data);
        });
    });
  },
  /**
   *
   */
  [CREATE_POST_REQUEST]: ({ commit }, postData) => {
    return new Promise((resolve, reject) => {
      commit("SET_POSTS_LOADING", true);
      commit("RESET_POST_ERRORS");
      APIService.createPost(postData)
        .then(response => {
          commit("ADD_POST", response.data);
          commit("SET_POSTS_LOADING", false);
          resolve({ status: 200, success: true });
        })
        .catch(err => {
          commit("SET_POST_ERRORS", err.response.data);
          commit("SET_POSTS_LOADING", false);
          reject({ status: 400, success: false });
        });
    });
  },
  [DELETE_POST_REQUEST]: ({ commit }, postID) => {
    return new Promise((resolve, reject) => {
      commit("SET_POSTS_LOADING", true);
      commit("RESET_POST_ERRORS");
      commit("RESET_LIKE_ERRORS");
      APIService.deletePost(postID)
        .then(response => {
          commit("DELETE_POST", postID);
          commit("SET_POSTS_LOADING", false);
          resolve(response.data);
        })
        .catch(err => {
          commit("SET_POST_ERRORS", err.response.data);
          commit("SET_POSTS_LOADING", false);
          reject({ status: 400, success: false });
        });
    });
  },
  [UNLIKE_POST_REQUEST]: ({ commit, dispatch }, postId) => {
    return new Promise((resolve, reject) => {
      commit("SET_POSTS_LOADING", true);
      commit("RESET_POST_ERRORS");
      commit("RESET_LIKE_ERRORS");
      APIService.likePost(postId, "unlike")
        .then(result => {
          dispatch("GET_POSTS_REQUEST")
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          commit("SET_POSTS_LOADING", false);
          commit("SET_LIKE_ERRORS", err.response.data);
          reject(err.response.data);
        });
    });
  },

  [LIKE_POST_REQUEST]: ({ commit, dispatch }, postId) => {
    return new Promise((resolve, reject) => {
      commit("SET_POSTS_LOADING", true);
      commit("RESET_POST_ERRORS");
      commit("RESET_LIKE_ERRORS");

      APIService.likePost(postId, "like")
        .then(result => {
          dispatch("GET_POSTS_REQUEST")
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          commit("SET_POSTS_LOADING", false);
          commit("SET_LIKE_ERRORS", err.response.data);
          reject(err.response.data);
        });
    });
  },
  /**
   *
   *
   */

  [ADD_COMMENT_REQUEST]: ({ commit, dispatch }, commentObject) => {
    return new Promise((resolve, reject) => {
      const { postID, comment } = commentObject;
      commit("RESET_COMMENT_ERRORS");
      commit("SET_POSTS_LOADING", true);
      APIService.addComment(postID, comment)
        .then(response => {
          commit("ADD_COMMENT", comment);
          commit("SET_POSTS_LOADING", false);
          resolve(response.data);
        })
        .catch(err => {
          commit("SET_COMMENT_ERRORS", err.response.data);
          commit("SET_POSTS_LOADING", false);
          reject(err.response.data);
        });
    });
  },
  [CLEAR_POSTS_REQUEST]: ({ commit }) => {
    commit("RESET_POST_ERRORS");
    commit("SET_POST", null);
    commit("SET_POSTS", null);
    commit("SET_POSTS_LOADING", false);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
