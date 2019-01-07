import Vue from "vue";
import Router from "vue-router";
import Landing from "@/components/layout/Landing.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import NotFound from "@/views/NotFound.vue";

import CreateProfile from "@/components/profile/add/CreateProfile.vue";
import ProfileList from "@/views/ProfileList";
import Profile from "@/views/Profile";
import EditProfile from "@/components/profile/edit/EditProfile";
import AddEducation from "@/components/profile/add/AddEducation";
import AddExperience from "@/components/profile/add/AddExperience";

import PostList from "@/views/PostList.vue";
import Post from "@/views/Post.vue";

import store from "./store/index";

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
      path: "/feed",
      name: "post-list",
      component: PostList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/feed/post/:id",
      name: "show-post",
      component: Post,
      props: true,
      meta: {
        requiresAuth: true
      }
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
      path: "/add-education",
      name: "add-education",
      component: AddEducation,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/add-experience",
      name: "add-experience",
      component: AddExperience,
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
      name: "show-profile",
      component: Profile,
      props: true
    },
    {
      path: "/profiles/",
      name: "profile-list",
      component: ProfileList
    },
    {
      path: "/not-found",
      name: "not-found",
      component: NotFound
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
