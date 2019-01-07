<template>
  <div class="comments">
    <CommentCard v-for="comment in comments" :key="comment._id" :comment="comment"/>
  </div>
</template>

<script>
import CommentCard from "@/components/post/CommentCard";
export default {
  name: "comment-feed",
  props: {
    title: {
      type: String
    },
    comments: {
      type: Array
    }
  },
  components: {
    CommentCard
  }
};
</script>

<style scoped>
</style>