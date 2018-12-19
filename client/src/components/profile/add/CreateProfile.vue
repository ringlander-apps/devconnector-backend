<template>
  <div class="create-profile">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Create your profile</h1>
          <p class="lead text-center">Let's add some information to let your profile stand out</p>
          <small class="d-block pb-3">* = required field</small>
          <form @submit.prevent="processForm">
            <TextFieldGroup
              functional
              :value="this.formData.handle"
              type="text"
              name="handle"
              placeholder="* Handle"
              :error="this.PROFILE_ERROR_HANDLE"
              :info="`A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)`"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidHandle?'is-invalid':'']"
            />
            <SelectListGroup
              functional
              :value="this.formData.status"
              :options="this.selectOptions"
              @change="handleFormInput"
              name="status"
              :error="this.PROFILE_ERROR_STATUS"
              :info="`Give us an idea of where you are at in your career`"
              :class="['form-control','form-control-lg',isInvalidStatus?'is-invalid':'']"
            />

            <TextFieldGroup
              functional
              :value="this.formData.company"
              type="text"
              name="company"
              placeholder="Company"
              :info="`Could be your own company or one you work for`"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg']"
            />
            <TextFieldGroup
              functional
              :value="this.formData.website"
              type="text"
              name="website"
              placeholder="Website"
              :error="this.PROFILE_ERROR_WEBSITE"
              :info="`Could be your own or a company website`"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidWebsite?'is-invalid':'']"
            />
            <TextFieldGroup
              functional
              :value="this.formData.location"
              type="text"
              name="location"
              placeholder="Location"
              :info="`City & state suggested (eg. Boston, MA)`"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg']"
            />
            <TextFieldGroup
              functional
              :value="this.formData.skills"
              type="text"
              name="skills"
              placeholder="* Skills"
              :error="this.PROFILE_ERROR_SKILLS"
              :info="`Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)`"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidSkills?'is-invalid':'']"
            />
            <TextFieldGroup
              functional
              :value="this.formData.githubusername"
              type="text"
              name="githubusername"
              placeholder="Github Username"
              :info="`If you want your latest repos and a Github link, include your username`"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg']"
            />
            <TextAreaFieldGroup
              functional
              :text="this.formData.bio"
              name="bio"
              placeholder="A short bio of yourself"
              :info="`Tell us a little about yourself`"
              :disabled="false"
              :class="['form-control','form-control-lg']"
              @change="handleFormInput"
            />
            <div class="mb-3">
              <button
                type="button"
                class="btn btn-light"
                @click="toggleDisplaySocialLinks"
              >Add Social Network Links</button>
              <span class="text-muted">Optional</span>
            </div>
            <div v-if="this.displaySocialInputs">
              <InputGroup
                :value="this.formData.twitter"
                type="text"
                name="twitter"
                placeholder="Twitter Profile URL"
                :disabled="false"
                :class="['form-control','form-control-lg',isInvalidTwitterURL?'is-invalid':'']"
                icon="fab fa-twitter"
                @input="handleFormInput"
                :error="this.PROFILE_ERROR_TWITTER"
              />
              <InputGroup
                :value="this.formData.facebook"
                type="text"
                name="facebook"
                placeholder="Facebook Page URL"
                :disabled="false"
                :class="['form-control','form-control-lg',isInvalidFacebookURL?'is-invalid':'']"
                icon="fab fa-facebook"
                @input="handleFormInput"
                :error="this.PROFILE_ERROR_FB"
              />
              <InputGroup
                :value="this.formData.linkedin"
                type="text"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                :disabled="false"
                :class="['form-control','form-control-lg',isInvalidLinkedInURL?'is-invalid':'']"
                icon="fab fa-linkedin"
                @input="handleFormInput"
                :error="this.PROFILE_ERROR_LINKEDIN"
              />
              <InputGroup
                :value="this.formData.youtube"
                type="text"
                name="youtube"
                placeholder="YouTube Channel URL"
                :disabled="false"
                :class="['form-control','form-control-lg',isInvalidYouTubeURL?'is-invalid':'']"
                icon="fab fa-youtube"
                @input="handleFormInput"
                :error="this.PROFILE_ERROR_YOUTUBE"
              />
              <InputGroup
                :value="this.formData.instagram"
                type="text"
                name="instagram"
                placeholder="Instagram Page URL"
                :disabled="false"
                :class="['form-control','form-control-lg',isInvalidInstagramURL?'is-invalid':'']"
                icon="fab fa-instagram"
                @input="handleFormInput"
                :error="this.PROFILE_ERROR_INSTAGRAM"
              />
            </div>
            <input type="submit" value="Create Profile" class="btn btn-info btn-block mt-4">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TextFieldGroup from "@/components/common/TextFieldGroup";
import TextAreaFieldGroup from "@/components/common/TextAreaFieldGroup";
import SelectListGroup from "@/components/common/SelectListGroup";
import InputGroup from "@/components/common/InputGroup";

import router from "@/router";

export default {
  name: "create-profile",
  components: {
    TextFieldGroup,
    TextAreaFieldGroup,
    SelectListGroup,
    InputGroup
  },
  data() {
    return {
      formData: {
        handle: "",
        website: "",
        company: "",
        location: "",
        status: "",
        bio: "",
        skills: "",
        githubusername: "",
        twitter: "",
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: ""
      },
      displaySocialInputs: false,
      selectedStatusOption: {},
      selectOptions: [
        {
          label: "* Select Professional Status",
          value: 0
        },
        {
          label: "Developer",
          value: 1
        },
        {
          label: "Junior Developer",
          value: 2
        },
        {
          label: "Senior Developer",
          value: 3
        },
        {
          label: "Manager",
          value: 4
        },
        {
          label: "Student or Learning",
          value: 5
        },
        {
          label: "Instructor or Teacher",
          value: 6
        },
        {
          label: "Intern",
          value: 7
        },
        {
          label: "Other",
          value: 8
        }
      ]
    };
  },
  methods: {
    ...mapActions(["CREATE_PROFILE_REQUEST"]),
    /***
     *
     */
    processForm(e) {
      this.CREATE_PROFILE_REQUEST(this.formData)
        .then(result => {
          if (result.success) {
            router.push({ name: "dashboard" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleDisplaySocialLinks() {
      const value = this.displaySocialInputs;
      this.displaySocialInputs = !value;
    },
    handleFormInput(element, value) {
      this.formData[element.name] = value;
    },
    handleSelect(element, v) {
      this.selectedStatusOption = this.selectOptions[v];
      this.formData.status = this.selectOptions[v].value.toString();
    }
  },
  computed: {
    ...mapGetters([
      "PROFILE_ERROR_HANDLE",
      "PROFILE_ERROR_WEBSITE",
      "PROFILE_ERROR_SKILLS",
      "PROFILE_ERROR_STATUS",
      "PROFILE_ERROR_YOUTUBE",
      "PROFILE_ERROR_TWITTER",
      "PROFILE_ERROR_FB",
      "PROFILE_ERROR_INSTAGRAM",
      "PROFILE_ERROR_LINKEDIN"
    ]),

    isInvalidHandle() {
      return this.PROFILE_ERROR_HANDLE !== undefined ? true : false;
    },
    isInvalidWebsite() {
      return this.PROFILE_ERROR_WEBSITE !== undefined ? true : false;
    },
    isInvalidSkills() {
      return this.PROFILE_ERROR_SKILLS !== undefined ? true : false;
    },
    isInvalidStatus() {
      return this.PROFILE_ERROR_STATUS !== undefined ? true : false;
    },
    isInvalidTwitterURL() {
      return this.PROFILE_ERROR_TWITTER !== undefined ? true : false;
    },
    isInvalidFacebookURL() {
      return this.PROFILE_ERROR_FB !== undefined ? true : false;
    },
    isInvalidYouTubeURL() {
      return this.PROFILE_ERROR_YOUTUBE !== undefined ? true : false;
    },
    isInvalidInstagramURL() {
      return this.PROFILE_ERROR_YOUTUBE !== undefined ? true : false;
    },
    isInvalidLinkedInURL() {
      return this.PROFILE_ERROR_LINKEDIN !== undefined ? true : false;
    }
  }
};
</script>

<style scoped>
</style>