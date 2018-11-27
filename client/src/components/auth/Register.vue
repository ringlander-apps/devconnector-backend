<template>
  <!-- <div class="container">
    <h1>Register</h1>
  </div>-->
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Sign Up</h1>
          <p class="lead text-center">Create your DevConnector account</p>
          <form @submit.prevent="processForm">
            <div class="form-group">
              <input
                v-model="state.name"
                type="text"
                v-bind:class="{'is-invalid':isInvalidName}"
                class="form-control form-control-lg"
                placeholder="Name"
                name="name"
              >
              <div v-if="isInvalidName" class="invalid-feedback">{{this.state.errors.name}}</div>
            </div>
            <div class="form-group">
              <input
                v-model="state.email"
                type="email"
                v-bind:class="{'is-invalid':isInvalidEmail}"
                class="form-control form-control-lg"
                placeholder="Email Address"
                name="email"
              >
              <div v-if="isInvalidEmail" class="invalid-feedback">{{this.state.errors.email}}</div>
              <small
                class="form-text text-muted"
              >This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div class="form-group">
              <input
                v-model="state.password"
                type="password"
                v-bind:class="{'is-invalid':isInvalidPassword}"
                class="form-control form-control-lg"
                placeholder="Password"
                name="password"
              >
              <div v-if="isInvalidPassword" class="invalid-feedback">{{this.state.errors.password}}</div>
            </div>
            <div class="form-group">
              <input
                v-model="state.password2"
                type="password"
                v-bind:class="{'is-invalid':isInvalidPassword2}"
                class="form-control form-control-lg"
                placeholder="Confirm Password"
                name="password2"
              >
              <div class="invalid-feedback">{{this.state.errors.password2}}</div>
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

export default {
  name: "register",
  data() {
    return {
      state: {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
      }
    };
  },
  computed: {
    isInvalidName() {
      if (this.state.errors) {
        return this.state.errors.name !== undefined ? true : false;
      }
    },
    isInvalidEmail() {
      if (this.state.errors) {
        return this.state.errors.email !== undefined ? true : false;
      }
    },
    isInvalidPassword() {
      if (this.state.errors) {
        return this.state.errors.password !== undefined ? true : false;
      }
    },
    isInvalidPassword2() {
      if (this.state.errors) {
        return this.state.errors.password2 !== undefined ? true : false;
      }
    }
  },
  methods: {
    setErrors(errors) {
      this.state.errors = errors;
    },
    processForm(e) {
      let { name, email, password, password2 } = this.state;

      const newUser = {
        name,
        email,
        password,
        password2
      };
      Axios.post("api/auth/register", newUser)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          this.setErrors(err.response.data);
        });
    }
  }
};
</script>

<style scoped>
</style>