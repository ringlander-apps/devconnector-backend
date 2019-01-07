<template>
  <div class="card card-body mb-3">
    <div class="row">
      <div class="col-md-2">
        <a href="profile.html">
          <img class="rounded-circle d-none d-md-block" :src="this.comment.avatar" alt>
        </a>
        <br>
        <p class="text-center">{{this.comment.name}}</p>
      </div>
      <div class="col-md-10">
        <p class="lead">{{this.comment.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment-card",
  props: {
    title: {
      type: String
    },
    comment: {
      type: Object
    }
  }
};
</script>

<style scoped>
</style>