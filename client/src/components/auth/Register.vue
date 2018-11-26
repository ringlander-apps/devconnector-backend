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
                class="form-control form-control-lg"
                placeholder="Name"
                name="name"
              >
            </div>
            <div class="form-group">
              <input
                v-model="state.email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email Address"
                name="email"
              >
              <small
                class="form-text text-muted"
              >This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div class="form-group">
              <input
                v-model="state.password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                name="password"
              >
            </div>
            <div class="form-group">
              <input
                v-model="state.password2"
                type="password"
                class="form-control form-control-lg"
                placeholder="Confirm Password"
                name="password2"
              >
            </div>
            <input type="submit" class="btn btn-info btn-block mt-4">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    processForm(e) {
      const { name, email, password, password2 } = this.state;

      const newUser = {
        name,
        email,
        password,
        password2
      };
    }
  }
};
</script>

<style scoped>
</style>