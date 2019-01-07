<template>
  <div class="profiles">
    <div class="container">
      <div class="row">
        <div v-if="LOADING || !PROFILES" class="col-md-12">
          <Spinner/>
        </div>
        <div class="col-md-12" v-else>
          <div v-if="PROFILES.length>0" class="col-md-12">
            <h1 class="display-4 text-center">Developer Profiles</h1>
            <p class="lead text-center">Browse and connect with developers</p>
            <!--  Insert profile items here-->
            <ProfileCard v-for="profile in PROFILES" :key="profile._id" :profile="profile"/>
          </div>
          <div class="col-md-12" v-else>No profiles found</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProfileCard from "@/components/profile/view/ProfileCard";
import Spinner from "@/components/common/Spinner";

export default {
  name: "profile-list",
  components: {
    ProfileCard,
    Spinner
  },
  computed: {
    ...mapGetters(["PROFILES", "PROFILE_ERROR_NOPROFILE", "LOADING"])
  },
  methods: {
    ...mapActions(["GET_PROFILES_REQUEST"])
  },
  created() {
    this.GET_PROFILES_REQUEST()
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>