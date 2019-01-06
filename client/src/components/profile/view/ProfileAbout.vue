<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-body bg-light mb-3">
        <h3 class="text-center text-info">{{firstName}}'s Bio</h3>
        <p v-if="this.profile.bio" class="lead">{{this.profile.bio}}</p>
        <p class="lead" v-else>{{firstName}} doesn't have a bio</p>
        <hr>
        <h3 class="text-center text-info">Skill Set</h3>
        <div class="row">
          <div class="d-flex flex-wrap justify-content-center align-items-center">
            <div class="p-3" v-for="skill in this.profile.skills">
              <i class="fa fa-check"></i>
              {{skill}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileAbout",
  props: {
    title: {
      type: String
    },
    profile: {
      type: Object
    }
  },
  computed: {
    firstName() {
      return this.profile.user.name.trim().split(" ")[0];
    }
  }
};
</script>

<style scoped>
</style>