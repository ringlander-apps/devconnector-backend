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
          <td class="btn-wrapper">
            <button type="button" @click="handleDelete(exp._id)" class="btn btn-danger">Delete</button>
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
  created() {},
  methods: {
    /**
     *
     */
    handleDelete(id) {
      this.DELETE_EXPERIENCE_REQUEST(id)
        .then(response => {
          if (response.status === 200) {
            this.GET_PROFILE_REQUEST();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions(["DELETE_EXPERIENCE_REQUEST", "GET_PROFILE_REQUEST"])
  }
};
</script>

<style scoped>
#editButton {
  margin-left: 10px;
}
</style>