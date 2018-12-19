<script>
export default {
  functional: true,
  render(h, { data, props, children }) {
    let element = (
      <div>
        <div class="btn-group mb-4" role="group">
          <router-link to="/edit-profile" class="btn btn-light">
            <i class="fas fa-user-circle text-info mr-1" />
            Edit Profile
          </router-link>
          <router-link to="/add-experience" class="btn btn-light">
            <i class="fab fa-black-tie text-info mr-1" />
            Add Experience
          </router-link>
          <router-link to="/add-education" class="btn btn-light">
            <i class="fas fa-graduation-cap text-info mr-1" />
            Add Education
          </router-link>
        </div>
      </div>
    );
    return element;
  }
};
</script>

<style scoped>
</style>