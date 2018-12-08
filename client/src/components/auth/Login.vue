<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Log In</h1>
          <p class="lead text-center">Sign in to your DevConnector account</p>
          <form @submit.prevent="processLogin">
            <TextFieldGroup
              functional
              :value="this.formData.email"
              type="email"
              name="email"
              placeholder="Email Address"
              :error="this.LOGIN_ERROR_EMAIL"
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
              :error="this.LOGIN_ERROR_PW"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidPassword?'is-invalid':'']"
            />
            <input type="submit" class="btn btn-info btn-block mt-4">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";
import TextFieldGroup from "@/components/common/TextFieldGroup";
export default {
  name: "login",
  components: {
    TextFieldGroup
  },
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    if (this.IS_AUTHENTICATED) {
      router.push({ name: "dashboard" });
    }
  },
  computed: {
    ...mapGetters(["LOGIN_ERROR_EMAIL", "LOGIN_ERROR_PW", "IS_AUTHENTICATED"]),
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
          if (result.success) {
            router.push({ name: "dashboard" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     *
     */
    handleFormInput(element, value) {
      this.formData[element.name] = value;
    }
  }
};
</script>

<style scoped>
</style>