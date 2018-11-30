<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Log In</h1>
          <p class="lead text-center">Sign in to your DevConnector account</p>
          <form @submit.prevent="processLogin">
            <div class="form-group">
              <input
                v-model="formData.email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email Address"
                name="email"
                v-bind:class="{'is-invalid':isInvalidEmail}"
              >
              <div v-if="isInvalidEmail" class="invalid-feedback">{{this.LOGIN_ERROR_EMAIL}}</div>
            </div>
            <div class="form-group">
              <input
                v-model="formData.password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                name="password"
                v-bind:class="{'is-invalid':isInvalidPassword}"
              >
              <div v-if="isInvalidPassword" class="invalid-feedback">{{this.LOGIN_ERROR_PW}}</div>
            </div>

            <input type="submit" class="btn btn-info btn-block mt-4">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["LOGIN_ERROR_EMAIL", "LOGIN_ERROR_PW"]),
    isInvalidEmail() {
      return this.LOGIN_ERROR_EMAIL !== undefined ? true : false;
    },
    isInvalidPassword() {
      return this.LOGIN_ERROR_PW !== undefined ? true : false;
    }
  },
  methods: {
    ...mapActions(["LOGIN_USER_REQUEST"]),
    processLogin(e) {
      const { email, password } = this.formData;

      const loginUser = {
        email,
        password
      };
      this.LOGIN_USER_REQUEST(loginUser)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>