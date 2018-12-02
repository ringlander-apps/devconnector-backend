<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">Dashboard</h1>
          <p class="lead text-muted">Welcome {{this.USER.name}}</p>
          <!-- Dashboard Actions -->
          <div class="btn-group mb-4" role="group">
            <a href="edit-profile.html" class="btn btn-light">
              <i class="fas fa-user-circle text-info mr-1"></i> Edit Profile
            </a>
            <a href="add-experience.html" class="btn btn-light">
              <i class="fab fa-black-tie text-info mr-1"></i>
              Add Experience
            </a>
            <a href="add-education.html" class="btn btn-light">
              <i class="fas fa-graduation-cap text-info mr-1"></i>
              Add Education
            </a>
          </div>

          <!-- Experience -->
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
                <tr>
                  <td>Tech Guy Web Solutions</td>
                  <td>Senior Developer</td>
                  <td>02-03-2009 - 01-02-2014</td>
                  <td>
                    <button class="btn btn-danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Traversy Media</td>
                  <td>Instructor & Developer</td>
                  <td>02-03-2015 - Now</td>
                  <td>
                    <button class="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Education -->
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
                <tr>
                  <td>Northern Essex</td>
                  <td>Associates</td>
                  <td>02-03-2007 - 01-02-2009</td>
                  <td>
                    <button class="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="margin-bottom: 60px;">
            <button class="btn btn-danger">Delete My Account</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileActions from "@/components/profile/ProfileActions";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "dashboard",
  components: {},

  computed: {
    name() {
      return this.data;
    },
    ...mapGetters(["USER"])
  }
};
</script>

<style scoped>
</style>