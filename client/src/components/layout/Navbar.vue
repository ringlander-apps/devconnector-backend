<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">DevConnector</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/profiles" class="nav-link">Developers</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link v-if="!USER" class="nav-link" to="/register">Sign up</router-link>
          </li>
          <li v-if="!IS_AUTHENTICATED" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="IS_AUTHENTICATED" class="nav-item">
            <button class="btn btn-link nav-link" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: mapGetters(["IS_AUTHENTICATED", "USER"]),
  methods: {
    logout() {
      console.log("Hi");
      this.LOGOUT_USER_REQUEST();
    },
    ...mapActions(["LOGOUT_USER_REQUEST"])
  }
};
</script>

<style scoped>
</style>