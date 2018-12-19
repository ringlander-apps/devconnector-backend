<template>
  <div class="add-experience">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <router-link class="btn btn-light" :to="{name:'dashboard'}">Go Back</router-link>
          <h1 class="display-4 text-center">Add your experience</h1>
          <p
            class="lead text-center"
          >Add any developer/programming positions that you have had in the past</p>
          <small class="d-block pb-3">* = required field</small>
          <form @submit.prevent="processForm">
            <TextFieldGroup
              functional
              :value="this.formData.title"
              type="text"
              name="title"
              placeholder="* Job Title"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidTitle?'is-invalid':'']"
              :error="this.EXPERIENCE_ERROR_TITLE"
            />
            <TextFieldGroup
              functional
              :value="this.formData.company"
              type="text"
              name="company"
              placeholder="* Company"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidCompany?'is-invalid':'']"
              :error="this.EXPERIENCE_ERROR_COMPANY"
            />
            <TextFieldGroup
              functional
              :value="this.formData.location"
              type="text"
              name="location"
              placeholder="Location"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg']"
            />
            <DateFieldGroup
              functional
              :value="this.formData.from"
              label="* From Date"
              name="from"
              placeholder="From Date"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidFromDate?'is-invalid':'']"
              :error="this.EXPERIENCE_ERROR_FROM"
            />
            <DateFieldGroup
              functional
              :value="this.formData.to"
              label="To Date"
              name="to"
              placeholder="From Date"
              @input="handleFormInput"
              :disabled="this.formData.current"
              :class="['form-control','form-control-lg']"
            />
            <CheckBoxInputGroup
              functional
              @change="handleFormInput"
              :class="['form-check-input']"
              label="Current Job"
              name="current"
              :checked="this.formData.current"
            />
            <TextAreaFieldGroup
              functional
              :text="this.formData.description"
              name="description"
              placeholder="Job Description"
              :info="`Some of your responsibilities, etc`"
              :disabled="false"
              :class="['form-control','form-control-lg']"
              @change="handleFormInput"
            />
            <input type="submit" class="btn btn-info btn-block mt-4" value="Add Experience">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextFieldGroup from "@/components/common/TextFieldGroup";
import TextAreaFieldGroup from "@/components/common/TextAreaFieldGroup";
import DateFieldGroup from "@/components/common/DateFieldGroup";
import CheckBoxInputGroup from "@/components/common/CheckBoxInputGroup";

import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "add-experience",
  components: {
    TextFieldGroup,
    TextAreaFieldGroup,
    DateFieldGroup,
    CheckBoxInputGroup
  },
  data() {
    return {
      formData: {
        title: "",
        company: "",
        location: "",
        description: "",
        from: "",
        to: "",
        current: false
      }
    };
  },
  computed: {
    isInvalidTitle() {
      return this.EXPERIENCE_ERROR_TITLE !== undefined ? true : false;
    },
    isInvalidCompany() {
      return this.EXPERIENCE_ERROR_COMPANY !== undefined ? true : false;
    },
    isInvalidFromDate() {
      return this.EXPERIENCE_ERROR_FROM !== undefined ? true : false;
    },
    ...mapGetters([
      "EXPERIENCE_ERROR_TITLE",
      "EXPERIENCE_ERROR_COMPANY",
      "EXPERIENCE_ERROR_FROM"
    ])
  },
  methods: {
    /**
     *
     */
    processForm(e) {
      this.ADD_EXPERIENCE_REQUEST(this.formData)
        .then(response => {
          if (response.status === 200) {
            router.push({ name: "dashboard" });
          }
        })
        .catch(err => {});
    },
    /**
     *
     */
    handleFormInput(element, value) {
      this.formData[element.name] = value;
    },
    ...mapActions(["ADD_EXPERIENCE_REQUEST"])
  },
  created() {}
};
</script>

<style scoped>
</style>