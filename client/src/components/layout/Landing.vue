<template>
  <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1 class="display-3 mb-4">Developer Connector
            </h1>
            <p class="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
            <hr />
            <router-link to="/register" class="btn btn-lg btn-info mr-2">Sign up</router-link>
            <router-link to="/login" class="btn btn-lg btn-light">Login</router-link>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "landing"
};
</script>

<style scoped>
</style>