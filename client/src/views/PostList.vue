<template>
  <div class="feed">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <CreatePost title="CreatePost"/>
          <div v-if="this.POSTS_LOADING||!this.POSTS">
            <Spinner/>
          </div>
          <div v-else>
            <PostFeed title="PostFeed" :posts="this.POSTS"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreatePost from "@/components/post/CreatePost";
import PostFeed from "@/components/post/PostFeed";
import Spinner from "@/components/common/Spinner";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "post-list",
  components: {
    CreatePost,
    PostFeed,
    Spinner
  },
  computed: {
    ...mapGetters(["POSTS_LOADING", "POSTS"])
  },
  methods: {
    ...mapActions(["GET_POSTS_REQUEST"])
  },
  mounted() {
    this.GET_POSTS_REQUEST()
      .then(result => {
        console.log(result);
      })
      .catch(err => {});
  }
};
</script>

<style scoped>
</style>