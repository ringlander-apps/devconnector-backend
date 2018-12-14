import Vue from "vue";
import Router from "vue-router";
import Landing from "@/components/layout/Landing.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import CreateProfile from "@/components/profile/add/CreateProfile.vue";
import Profile from "@/views/Profile";
import EditProfile from "@/components/profile/edit/EditProfile";

import store from "./store/index";
import jwt_decode from "jwt-decode";

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/create-profile",
      name: "create-profile",
      component: CreateProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: EditProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile/:handle",
      name: "profile",
      component: Profile,
      // meta: {
      //   requiresAuth: true
      // },
      props: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const { IS_AUTHENTICATED } = store.getters;

    if (IS_AUTHENTICATED) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
