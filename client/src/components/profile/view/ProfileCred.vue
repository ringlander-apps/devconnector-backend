<template>
  <div class="row">
    <div class="col-md-6">
      <h3 class="text-center text-info">Experience</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="exp in experience" :key="exp._id">
          <h4>{{exp.company}}</h4>
          <p>{{exp.from|monthAndYear}} - {{exp.to|monthAndYear}}</p>
          <p>
            <strong>Position:</strong>
            {{exp.title}}
          </p>
          <p>
            <strong>Description:</strong>
            {{exp.description}}
          </p>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <h3 class="text-center text-info">Education</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="edu in education" :key="edu._id">
          <h4>{{edu.school}}</h4>
          <p>{{edu.from|monthAndYear}} - {{edu.to|monthAndYear}}</p>
          <p>
            <strong>Degree:</strong>
            {{edu.degree}}
          </p>
          <p>
            <strong>Field of Study:</strong>
            {{edu.fieldofstudy}}
          </p>
          <p>
            <strong>Description:</strong>
            {{edu.description}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FormattedDate from "@/filters/FormattedDate";
export default {
  name: "profileCred",
  props: {
    title: {
      type: String
    },
    profile: {
      type: Object
    },
    experience: {
      type: Array
    },
    education: {
      type: Array
    }
  },
  filters: {
    monthAndYear: FormattedDate.monthAndYear
  }
};
</script>

<style scoped>
</style>