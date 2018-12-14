<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link class="navbar-brand" :to="{name:'landing'}">DevConnector</router-link>
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
            <router-link class="nav-link" :to="{name:'dashboard'}">Dashboard</router-link>
          </li>

          <li v-if="IS_AUTHENTICATED" class="nav-item">
            <div class="nav-link" @click="logout">
              <img
                class="rounded-circle"
                style="width: 25px;margin-right:5px"
                :src="this.USER.avatar"
                alt
                title="You must have a Gravatar connected to your email to display an image"
              > Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  computed: mapGetters(["IS_AUTHENTICATED", "USER"]),
  methods: {
    logout() {
      this.LOGOUT_USER_REQUEST();
      this.CLEAR_PROFILE_REQUEST();
      router.push({ name: "landing" });
    },
    ...mapActions(["LOGOUT_USER_REQUEST", "CLEAR_PROFILE_REQUEST"])
  }
};
</script>

<style scoped>
.nav-item {
  cursor: pointer;
}
</style>