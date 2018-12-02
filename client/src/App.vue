<template>
  <div id="app">
    <Navbar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>
<script>
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
img {
  width: 100%;
}
.fade-enter-active {
  transition-duration: 0.5s;
  transition-timing-function: ease;
  transition-property: opacity;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.landing {
  position: relative;
  background: url("./assets/img/showcase.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  margin-top: -24px;
  margin-bottom: -50px;
}

.landing-inner {
  padding-top: 80px;
}

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-form {
  opacity: 0.9;
}

.latest-profiles-img {
  width: 40px;
  height: 40px;
}

.form-control::placeholder {
  color: #bbb !important;
}
</style>
