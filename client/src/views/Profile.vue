<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <router-link
                class="btn btn-light mb-3 float-left"
                :to="{name:'profile-list'}"
              >Back To Profiles</router-link>
            </div>
            <div class="col-md-6"></div>
          </div>
          <!-- PROFILE HEADER -->
          <div v-if="LOADING && !PROFILE" class="col-md-12">
            <Spinner/>
          </div>
          <div v-else>
            <ProfileHeader title="ProfileHeader" :profile="PROFILE"/>
            <ProfileAbout title="ProfileAbout" :profile="PROFILE"/>
            <ProfileCred
              title="ProfileCred"
              :profile="PROFILE"
              :experience="PROFILE.experience"
              :education="PROFILE.education"
            />

            <ProfileGithub
              v-if="PROFILE.githubusername"
              :githubUserName="PROFILE.githubusername"
              title="ProfileGithub"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/profile/view/ProfileHeader";
import ProfileGithub from "@/components/profile/view/ProfileGithub";
import ProfileAbout from "@/components/profile/view/ProfileAbout";
import ProfileCred from "@/components/profile/view/ProfileCred";

import Spinner from "@/components/common/Spinner";

import { mapActions, mapGetters } from "vuex";

import router from "@/router.js";

export default {
  name: "show-profile",
  components: {
    ProfileHeader,
    ProfileGithub,
    ProfileAbout,
    ProfileCred,
    Spinner
  },
  props: {
    handle: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions(["GET_PROFILE_BY_HANDLE_REQUEST"])
  },
  computed: {
    ...mapGetters(["PROFILE", "PROFILE_ERROR_NOPROFILE", "LOADING"])
  },
  created() {
    this.GET_PROFILE_BY_HANDLE_REQUEST(this.handle)
      .then(result => {})
      .catch(err => {
        if (err.status === 400) {
          router.push({ name: "not-found" });
        }
      });
  }
};
</script>

<style scoped>
</style>