<script>
export default {
  functional: true,
  render(h, { data, props, children }) {
    let element = (
      <div>
        <div class="btn-group mb-4" role="group">
          <router-link to="/landing" class="btn btn-light">
            <i class="fas fa-user-circle text-info mr-1" />
            Edit Profile
          </router-link>
          <a href="add-experience.html" class="btn btn-light">
            <i class="fab fa-black-tie text-info mr-1" />
            Add Experience
          </a>
          <a href="add-education.html" class="btn btn-light">
            <i class="fas fa-graduation-cap text-info mr-1" />
            Add Education
          </a>
        </div>
      </div>
    );
    return element;
  }
};
</script>

<style scoped>
</style>