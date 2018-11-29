<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Sign Up</h1>
          <p class="lead text-center">Create your DevConnector account</p>
          <form @submit.prevent="processForm">
            <div class="form-group">
              <input
                v-model="formData.name"
                type="text"
                v-bind:class="{'is-invalid':isInvalidName}"
                class="form-control form-control-lg"
                placeholder="Name"
                name="name"
              >
              <div v-if="isInvalidName" class="invalid-feedback">{{this.AUTH_ERROR_NAME}}</div>
            </div>
            <div class="form-group">
              <input
                v-model="formData.email"
                type="email"
                v-bind:class="{'is-invalid':isInvalidEmail}"
                class="form-control form-control-lg"
                placeholder="Email Address"
                name="email"
              >
              <div v-if="isInvalidEmail" class="invalid-feedback">{{this.AUTH_ERROR_EMAIL}}</div>
              <small
                class="form-text text-muted"
              >This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div class="form-group">
              <input
                v-model="formData.password"
                type="password"
                v-bind:class="{'is-invalid':isInvalidPassword}"
                class="form-control form-control-lg"
                placeholder="Password"
                name="password"
              >
              <div v-if="isInvalidPassword" class="invalid-feedback">{{this.AUTH_ERROR_PW}}</div>
            </div>
            <div class="form-group">
              <input
                v-model="formData.password2"
                type="password"
                v-bind:class="{'is-invalid':isInvalidPassword2}"
                class="form-control form-control-lg"
                placeholder="Confirm Password"
                name="password2"
              >
              <div v-if="isInvalidPassword2" class="invalid-feedback">{{this.AUTH_ERROR_PW2}}</div>
            </div>
            <input type="submit" class="btn btn-info btn-block mt-4">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

import { mapActions, mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "register",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  },
  computed: {
    ...mapGetters([
      "AUTH_ERROR_NAME",
      "AUTH_ERROR_EMAIL",
      "AUTH_ERROR_PW",
      "AUTH_ERROR_PW2"
    ]),
    isInvalidName() {
      return this.AUTH_ERROR_NAME !== undefined ? true : false;
    },
    isInvalidEmail() {
      return this.AUTH_ERROR_EMAIL !== undefined ? true : false;
    },
    isInvalidPassword() {
      return this.AUTH_ERROR_PW !== undefined ? true : false;
    },
    isInvalidPassword2() {
      return this.AUTH_ERROR_PW2 !== undefined ? true : false;
    }
  },
  methods: {
    ...mapActions(["REGISTER_USER_REQUEST"]),
    /***
     *
     */
    processForm(e) {
      let { name, email, password, password2 } = this.formData;

      const newUser = {
        name,
        email,
        password,
        password2
      };

      this.REGISTER_USER_REQUEST(newUser)
        .then(result => {
          if (result.success) {
            router.push({
              name: "login"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
</style>