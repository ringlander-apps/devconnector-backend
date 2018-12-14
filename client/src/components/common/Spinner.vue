<script>
import spinner from "./spinner.gif";
export default {
  functional: true,
  props: {},
  render(h, { data, props, children }) {
    return (
      <div>
        <img
          src={spinner}
          alt="Loading..."
          style={{ width: "200px", margin: "auto", display: "block" }}
        />
      </div>
    );
  }
};
</script>

<style scoped>
</style>