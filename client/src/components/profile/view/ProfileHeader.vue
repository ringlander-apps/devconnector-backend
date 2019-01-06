<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-body bg-info text-white mb-3">
        <div class="row">
          <div class="col-4 col-md-3 m-auto">
            <img class="rounded-circle" :src="profile.user.avatar" alt>
          </div>
        </div>
        <div class="text-center">
          <h1 class="display-4 text-center">{{this.profile.user.name}}</h1>
          <p class="lead text-center">
            {{this.profile.status}}
            <span v-if="this.profile.company">at {{this.profile.company}}</span>
          </p>
          <p>{{this.profile.location}}</p>
          <p>
            <a
              class="text-white p-2"
              v-if="this.profile.website"
              :href="this.profile.website"
              target="_blank"
            >
              <i class="fas fa-globe fa-2x"></i>
            </a>
            <a
              v-if="this.profile.social.twitter"
              class="text-white p-2"
              :href="this.profile.social.twitter"
              target="_blank"
            >
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            <a
              v-if="this.profile.social.facebook"
              class="text-white p-2"
              :href="this.profile.social.facebook"
              target="_blank"
            >
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            <a
              v-if="this.profile.social.linkedin"
              class="text-white p-2"
              :href="this.profile.social.linkedin"
              target="_blank"
            >
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
            <a
              v-if="this.profile.social.instagram"
              class="text-white p-2"
              :href="this.profile.social.instagram"
              target="_blank"
            >
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileHeader",
  props: {
    title: {
      type: String
    },
    profile: {
      type: Object
    }
  }
};
</script>

<style scoped>
</style>