<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- Back button -->
          <div class="row">
            <div class="col-md-6">
              <router-link
                class="btn btn-light mb-3 float-left"
                :to="{name:'post-list'}"
              >Back To Posts</router-link>
            </div>
            <div class="col-md-6"></div>
          </div>
          <!-- End back button -->
          <!-- POST ITEM -->
          <div v-if="POSTS_LOADING || this.POST===null||Object.keys(this.POST).length===0">
            <Spinner/>
          </div>
          <div v-else>
            <PostCard v-if="this.POST" :showActions="false" :post="this.POST"/>
            <AddComment :postID="this.id"/>
            <CommentFeed title="CommentFeed" :comments="this.POST.comments" :postID="this.id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AddComment from "@/components/post/AddComment";
import PostCard from "@/components/post/PostCard";
import CommentFeed from "@/components/post/CommentFeed";

import Spinner from "@/components/common/Spinner";

export default {
  name: "show-post",
  props: {
    title: {
      type: String
    },
    id: {
      type: String
    }
  },
  components: {
    AddComment,
    PostCard,
    CommentFeed,
    Spinner
  },
  methods: {
    ...mapActions(["GET_POST_BY_ID_REQUEST"])
  },
  created() {
    this.GET_POST_BY_ID_REQUEST(this.id)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapGetters(["POST", "POSTS_LOADING"])
  }
};
</script>

<style scoped>
</style>