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
  /**
   *
   */
  getPosts() {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/posts")
        .then(response => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  /**
   *
   * @param {*} postID
   */
  getPostById(postID) {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/posts/${postID}`)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} post
   */
  createPost(post) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/posts", post)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} postId
   */
  deletePost(postId) {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`/posts/${postId}`)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  likePost(postId, operation) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`/posts/${postId}/${operation}`)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} postId
   * @param {*} comment
   */
  addComment(postId, comment) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`/posts/${postId}/comment`, comment)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} postID
   * @param {*} commentID
   */
  deleteComment(postID, commentID) {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`/posts/${postID}/comment/${commentID}`)
        .then(respoense => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**  PROFILE related methods  */
  /**
   *
   */
  getProfiles() {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/profile/all")
        .then(response => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  /**
   *
   */
  getProfile() {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/profile")
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },
  /**
   *
   * @param {*} handle
   */
  getProfileByHandle(handle) {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/profile/handle/${handle}`)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} userProfile
   */
  createProfile(userProfile) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/profile", userProfile)
        .then(response => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },
  /**
   *
   * @param {*} userProfile
   */
  updateProfile(userProfile) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/profile", userProfile)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   */
  deleteProfile() {
    return new Promise((resolve, reject) => {
      apiClient
        .delete("/profile")
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },
  /**
   *
   * @param {*} education
   */
  addEducation(education) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/profile/education", education)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} educationId
   */
  deleteEducation(educationId) {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`/profile/education/${educationId}`)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} educationId
   * @param {*} education
   */
  updateEducation(educationId, education) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`/profile/education/${educationId}`, education)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} experience
   */
  addExperience(experience) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/profile/experience", experience)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} experienceId
   */
  deleteExperience(experienceId) {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`/profile/experience/${experienceId}`)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} experienceId
   * @param {*} experience
   */
  updateExperience(experienceId, experience) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`/profile/experience/${experienceId}`, experience)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
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
