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
        <div>
          <button
            v-if="USER.name===comment.name"
            @click.prevent="handleDeleteComment(comment._id)"
            type="button"
            class="btn btn-danger mr-1"
          >
            <i class="fas fa-times"></i>
            Delete Comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "comment-card",
  props: {
    title: {
      type: String
    },
    postID: {
      type: String
    },
    comment: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(["USER"])
  },
  methods: {
    ...mapActions(["DELETE_COMMENT_REQUEST"]),
    handleDeleteComment(commentId) {
      const deleteObject = {
        commentID: commentId,
        postID: this.postID
      };
      this.DELETE_COMMENT_REQUEST(deleteObject)
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