<template>
  <div class="add-education">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <router-link class="btn btn-light" :to="{name:'dashboard'}">Go Back</router-link>
          <h1 class="display-4 text-center">Add Your Education</h1>
          <p class="lead text-center">Add any school, bootcamp, etc that you have attended</p>
          <small class="d-block pb-3">* = required field</small>
          <form @submit.prevent="processForm">
            <TextFieldGroup
              functional
              :value="this.formData.school"
              type="text"
              name="school"
              placeholder="* School or Bootcamp"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidSchool?'is-invalid':'']"
              :error="this.EDUCATION_ERROR_SCHOOL"
            />
            <TextFieldGroup
              functional
              :value="this.formData.degree"
              type="text"
              name="degree"
              placeholder="* Degree or Certificate"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidDegree?'is-invalid':'']"
              :error="this.EDUCATION_ERROR_DEGREE"
            />
            <TextFieldGroup
              functional
              :value="this.formData.fieldOfStudy"
              type="text"
              name="fieldOfStudy"
              placeholder="Field of Study"
              @input="handleFormInput"
              :disabled="false"
              :class="['form-control','form-control-lg',isInvalidFieldOfStudy?'is-invalid':'']"
              :error="this.EDUCATION_ERROR_FOS"
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
              :error="this.EDUCATION_ERROR_FROM"
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
              label="Current Education"
              name="current"
              :checked="this.formData.current"
            />
            <TextAreaFieldGroup
              functional
              :text="this.formData.description"
              name="description"
              placeholder="Program Description"
              :info="`Tell us about your experience and what you learned`"
              :disabled="false"
              :class="['form-control','form-control-lg']"
              @change="handleFormInput"
            />
            <input type="submit" class="btn btn-info btn-block mt-4" value="Add Education">
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
  name: "add-education",
  components: {
    TextFieldGroup,
    TextAreaFieldGroup,
    DateFieldGroup,
    CheckBoxInputGroup
  },
  data() {
    return {
      formData: {
        school: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
      }
    };
  },
  computed: {
    isInvalidSchool() {
      return this.EDUCATION_ERROR_SCHOOL !== undefined ? true : false;
    },
    isInvalidDegree() {
      return this.EDUCATION_ERROR_DEGREE !== undefined ? true : false;
    },
    isInvalidFromDate() {
      return this.EDUCATION_ERROR_FROM !== undefined ? true : false;
    },
    isInvalidFieldOfStudy() {
      return this.EDUCATION_ERROR_FOS !== undefined ? true : false;
    },
    ...mapGetters([
      "EDUCATION_ERROR_SCHOOL",
      "EDUCATION_ERROR_DEGREE",
      "EDUCATION_ERROR_FROM",
      "EDUCATION_ERROR_FOS"
    ])
  },
  methods: {
    processForm(e) {
      this.ADD_EDUCATION_REQUEST(this.formData)
        .then(result => {
          if (result.status === 200) {
            router.push({ name: "dashboard" });
          }
        })
        .catch(err => {});
    },
    handleFormInput(element, value) {
      this.formData[element.name] = value;
    },
    ...mapActions(["ADD_EDUCATION_REQUEST"])
  },
  created() {}
};
</script>

<style scoped>
</style>