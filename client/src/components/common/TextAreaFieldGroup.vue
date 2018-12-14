<script>
export default {
  functional: true,
  props: {
    text: {
      type: String,
      required: true
    },
    info: {
      type: String
    },
    error: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  render(h, { data, props, children }) {
    const onChange = data.on["change"];
    let wrapperElement = (
      <div class="form-group">
        <textarea
          name={data.attrs.name}
          class={data.class}
          placeholder={data.attrs.placeholder}
          onChange={e => onChange(e, e.target.value)}
        />
        <small class="form-text text-muted">{props.info}</small>
      </div>
    );
    return wrapperElement;
  }
};
</script>
