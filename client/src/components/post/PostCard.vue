<template>
  <div class="card card-body mb-3">
    <div class="row">
      <div class="col-md-2">
        <a href="profile.html">
          <img class="rounded-circle d-none d-md-block" :src="post.avatar" alt>
        </a>
        <br>
        <p class="text-center">{{post.name}}</p>
      </div>
      <div class="col-md-10">
        <p class="lead">{{post.text}}</p>
        <div v-if="showActions">
          <button
            @click.prevent="handleLikePost(post._id)"
            type="button"
            class="btn btn-light mr-1"
          >
            <i class="fas fa-thumbs-up" v-bind:class="{'text-info':loggedInUserLikes}"></i>
            <span class="badge badge-light">{{post.likes.length}}</span>
          </button>
          <button
            @click.prevent="handleUnlikePost(post._id)"
            type="button"
            class="btn btn-light mr-1"
          >
            <i class="text-secondary fas fa-thumbs-down"></i>
          </button>
          <router-link
            class="btn btn-info mr-1"
            :to="{name:'show-post',params:{id:post._id}}"
          >Comments</router-link>
          <button
            v-if="USER.name===post.name"
            @click.prevent="handleDeletePost(post._id)"
            type="button"
            class="btn btn-danger mr-1"
          >
            <i class="fas fa-times"></i>
            Delete Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "post-card",
  props: {
    title: {
      type: String
    },
    post: {
      type: Object
    },
    showActions: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["USER"]),
    loggedInUserLikes() {
      const { likes } = this.post;
      if (likes.filter(like => like.user === this.USER.id).length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions([
      "DELETE_POST_REQUEST",
      "LIKE_POST_REQUEST",
      "UNLIKE_POST_REQUEST"
    ]),
    handleLikePost(postID) {
      this.LIKE_POST_REQUEST(postID)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleUnlikePost(postID) {
      this.UNLIKE_POST_REQUEST(postID)
        .then(result => {
          //console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDeletePost(postID) {
      console.log(postID);
      //call action to delete post
      this.DELETE_POST_REQUEST(postID)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>