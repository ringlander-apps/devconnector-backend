import Vue from "vue";
import Router from "vue-router";
import Landing from "@/components/layout/Landing.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/",
      name: "landing",
      component: Landing
    }
  ]
});
