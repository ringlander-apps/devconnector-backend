<template>
  <div>
    <h4 class="mb-2">Education Credentials</h4>
    <table class="table">
      <thead>
        <tr>
          <th>School</th>
          <th>Degree</th>
          <th>Years</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr v-for="edu in education" :key="edu._id">
          <td>{{edu.school}}</td>
          <td>{{edu.degree}}</td>
          <td>{{edu.from|formattedDate}} - {{edu.to|formattedDate}}</td>
          <td class="btn-wrapper">
            <button @click="handleDelete(edu._id)" class="btn btn-danger">Delete</button>
            <button id="editButton" class="btn btn-info">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormattedDate from "@/filters/FormattedDate";

import { mapActions } from "vuex";

export default {
  name: "education",
  props: {
    education: {
      type: Array
    }
  },
  data() {
    return {};
  },
  filters: {
    formattedDate: FormattedDate.formattedDate
  },
  methods: {
    handleDelete(id) {
      this.DELETE_EDUCATION_REQUEST(id)
        .then(result => {
          if (result.status === 200) {
            console.log(`EDUCATION deleted`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions(["DELETE_EDUCATION_REQUEST"])
  }
};
</script>

<style scoped>
#editButton {
  margin-left: 10px;
}
</style>