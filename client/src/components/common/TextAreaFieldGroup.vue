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
          onChange={e => onChange(e.target, e.target.value)}
          value={props.text}
        />
        {props.info && <small class="form-text text-muted">{props.info}</small>}
        {props.error && <div class="invalid-feedback">{props.error}</div>}
      </div>
    );
    return wrapperElement;
  }
};
</script>
