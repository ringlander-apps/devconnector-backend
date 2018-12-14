<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">Dashboard</h1>
          <div v-if="!PROFILE || LOADING">
            <Spinner/>
          </div>
          <div v-else>
            <div v-if="Object.keys(PROFILE).length>0">
              <p class="lead text-muted">Welcome
                <router-link
                  :to="{name:'profile',params:{handle:PROFILE.handle}}"
                >{{this.USER.name}}</router-link>
              </p>
              <ProfileActions/>
              <div style="margin-bottom:60px">
                <button
                  @click="handleDeleteProfile"
                  type="button"
                  class="btn btn-danger"
                >Delete My Account</button>
              </div>
            </div>

            <div v-else>
              <!-- USER is logged in but no profile is created-->
              <p class="lead text-muted">Welcome {{this.USER.name}}</p>
              <p>You have not setup a profile yet, please add some info</p>
              <router-link :to="{name:'create-profile'}" class="btn btn-lg btn-info">Create Profile</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileActions from "@/components/profile/ProfileActions";
import Spinner from "@/components/common/Spinner";

import { mapActions, mapGetters } from "vuex";

import router from "@/router";

export default {
  name: "dashboard",
  components: {
    Spinner,
    ProfileActions
  },

  computed: {
    name() {
      return this.data;
    },
    ...mapGetters(["USER", "PROFILE", "LOADING"])
  },
  methods: {
    ...mapActions([
      "GET_PROFILE_REQUEST",
      "DELETE_PROFILE_REQUEST",
      "LOGOUT_USER_REQUEST",
      "CLEAR_PROFILE_REQUEST"
    ]),
    /**
     *
     */
    handleDeleteProfile() {
      if (
        confirm(
          "Are you sure you want to delete current profile/user? This can NOT be undone"
        )
      ) {
        this.DELETE_PROFILE_REQUEST()
          .then(response => {
            if ((response.status = 200)) {
              this.LOGOUT_USER_REQUEST();
              this.CLEAR_PROFILE_REQUEST();
              router.push({ name: "login" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.GET_PROFILE_REQUEST()
      .then(result => {
        console.log(result);
      })
      .catch(err => {});
  }
};
</script>

<style scoped>
</style>