<template>
  <div>
    <h4 class="mb-2">Experience Credentials</h4>
    <table class="table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Title</th>
          <th>Years</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exp in experience" :key="exp._id">
          <td>{{exp.company}}</td>
          <td>{{exp.title}}</td>
          <td>{{exp.from|formattedDate}} - {{exp.to|formattedDate}}</td>
          <td>
            <button class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormattedDate from "@/filters/FormattedDate";
export default {
  name: "experience",
  props: {
    experience: {
      type: Array
    }
  },
  computed: {},
  filters: {
    formattedDate: FormattedDate.formattedDate
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style scoped>
</style>