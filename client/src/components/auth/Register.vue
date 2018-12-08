<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Sign Up</h1>
          <p class="lead text-center">Create your DevConnector account</p>
          <form @submit.prevent="processForm">
            <TextFieldGroup
              functional
              :value="this.formData.name"
              name="name"
              placeholder="Name"
              :error="this.AUTH_ERROR_NAME"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidName?'is-invalid':'']"
            />
            <TextFieldGroup
              functional
              :value="this.formData.email"
              type="email"
              name="email"
              placeholder="Email Address"
              :error="this.AUTH_ERROR_EMAIL"
              :info="'This site uses Gravatar so if you want a profile image, use a Gravatar email'"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidEmail?'is-invalid':'']"
            />
            <TextFieldGroup
              functional
              :value="this.formData.password"
              type="password"
              name="password"
              placeholder="Password"
              :error="this.AUTH_ERROR_PW"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidPassword?'is-invalid':'']"
            />
            <TextFieldGroup
              functional
              :value="this.formData.password2"
              type="password"
              name="password2"
              placeholder="Confirm Password"
              :error="this.AUTH_ERROR_PW2"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidPassword2?'is-invalid':'']"
            />
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
import TextFieldGroup from "@/components/common/TextFieldGroup";

export default {
  name: "register",
  components: {
    TextFieldGroup
  },
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
      "AUTH_ERROR_PW2",
      "IS_AUTHENTICATED"
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
  mounted() {
    if (this.IS_AUTHENTICATED) {
      router.push({ name: "dashboard" });
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
    },
    handleFormInput(element, value) {
      this.formData[element.name] = value;
    }
  }
};
</script>

<style scoped>
</style>