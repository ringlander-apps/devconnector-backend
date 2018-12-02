<template>
  <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1 class="display-3 mb-4">Developer Connector</h1>
            <p
              class="lead"
            >Create a developer profile/portfolio, share posts and get help from other developers</p>
            <hr>
            <router-link v-if="!USER" to="/register" class="btn btn-lg btn-info mr-2">Sign up</router-link>
            <router-link v-if="!IS_AUTHENTICATED" to="/login" class="btn btn-lg btn-light">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import APIService from "@/services/APIService";
export default {
  name: "landing",
  data() {
    return {
      isAuth: null
    };
  },

  computed: {
    ...mapGetters(["USER", "IS_AUTHENTICATED"])
  },

  methods: {}
};
</script>

<style scoped>
</style>