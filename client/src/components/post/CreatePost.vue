<template>
  <div class="post-form mb-3">
    <div class="card card-info">
      <div class="card-header bg-info text-white">Say Something...</div>
      <div class="card-body">
        <form @submit.prevent="processForm">
          <TextAreaFieldGroup
            functional
            :text="this.formData.text"
            name="text"
            placeholder="Create a post"
            :error="this.POST_ERRORS_TEXT"
            :disabled="false"
            :class="['form-control','form-control-lg',isInvalidPostText?'is-invalid':'']"
            @change="handleFormInput"
          />
          <input type="submit" value="Create Post" class="btn btn-dark">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextAreaFieldGroup from "@/components/common/TextAreaFieldGroup";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "create-post",
  props: {
    title: {
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
    ...mapActions(["CREATE_POST_REQUEST"]),
    processForm(e) {
      const newPost = {
        text: this.formData.text,
        name: this.USER.name,
        avatar: this.USER.avatar
      };
      this.CREATE_POST_REQUEST(newPost)
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
    ...mapGetters(["POST_ERRORS_TEXT", "USER"]),

    isInvalidPostText() {
      return this.POST_ERRORS_TEXT !== undefined ? true : false;
    }
  }
};
</script>

<style scoped>
</style>