<template>
  <div class="posts">
    <div v-if="posts.length>0">
      <PostCard
        v-for="post in this.posts"
        :showActions="true"
        :key="post._id"
        :post="post"
        :title="post.text"
      />
    </div>
    <div v-else>No posts found</div>
  </div>
</template>

<script>
import PostCard from "@/components/post/PostCard";
export default {
  components: {
    PostCard
  },
  name: "post-feed",
  props: {
    title: {
      type: String
    },
    posts: {
      type: Array
    }
  }
};
</script>

<style scoped>
</style>