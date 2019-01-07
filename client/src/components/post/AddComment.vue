<template>
  <div class="post-form mb-3">
    <div class="card card-info">
      <div class="card-header bg-info text-white">Reply on topic...</div>
      <div class="card-body">
        <form @submit.prevent="processForm">
          <TextAreaFieldGroup
            functional
            :text="this.formData.text"
            name="text"
            placeholder="Start the discussion here...."
            :error="this.COMMENT_ERRORS_TEXT"
            :disabled="false"
            :class="['form-control','form-control-lg',isInvalidCommentText?'is-invalid':'']"
            @change="handleFormInput"
          />
          <input type="submit" value="Add Comment" class="btn btn-dark">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextAreaFieldGroup from "@/components/common/TextAreaFieldGroup";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "add-comment",
  props: {
    title: {
      type: String
    },
    postID: {
      type: String
    }
  },
  data() {
    return {
      formData: {
        text: ""
      }
    };
  },
  components: {
    TextAreaFieldGroup
  },
  methods: {
    ...mapActions(["ADD_COMMENT_REQUEST"]),
    processForm(e) {
      const newComment = {
        postID: this.postID,
        comment: {
          text: this.formData.text,
          name: this.USER.name,
          avatar: this.USER.avatar
        }
      };

      this.ADD_COMMENT_REQUEST(newComment)
        .then(result => {
          this.formData.text = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleFormInput(element, value) {
      this.formData[element.name] = value;
    }
  },
  computed: {
    ...mapGetters(["USER", "COMMENT_ERRORS_TEXT"]),

    isInvalidCommentText() {
      return this.COMMENT_ERRORS_TEXT !== undefined ? true : false;
    }
  }
};
</script>

<style scoped>
</style>