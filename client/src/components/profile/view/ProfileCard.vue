<template>
  <div class="card card-body bg-light mb-3">
    <div class="row">
      <div class="col-2">
        <img class="rounded-circle" :src="this.profile.user.avatar" alt>
      </div>
      <div class="col-lg-6 col-md-4 col-8">
        <h3>{{this.profile.user.name}}</h3>
        <p>
          {{this.profile.status}}
          <span v-if="this.profile.company">at {{this.profile.company}}</span>
        </p>
        <p v-if="this.profile.location">{{this.profile.location}}</p>
        <router-link :to="{name:'show-profile',params:{handle: profile.handle}}">View Profile</router-link>
      </div>
      <div class="col-md-4 d-none d-lg-block">
        <h4>Skill Set</h4>
        <ul class="list-group">
          <li v-for="skill in this.profile.skills.slice(0,4)" class="list-group-item">
            <i class="fa fa-check pr-1"></i>
            {{skill}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import isEmpty from "@/validation/is-empty";

export default {
  name: "profile-card",
  props: {
    profile: {
      type: Object
    }
  },
  computed: {},
  methods: {
    valIsEmpty(value) {
      return isEmpty(value);
    }
  }
};
</script>

<style scoped>
</style>