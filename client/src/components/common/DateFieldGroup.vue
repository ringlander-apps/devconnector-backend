<script>
export default {
  functional: true,
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
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
    const onChange = data.on["input"];
    let element = (
      <div>
        <h6>{props.label}</h6>
        <div class="form-group">
          <input
            type="date"
            class={data.class}
            name={data.attrs.name}
            value={props.value}
            placeholder={data.attrs.placeholder}
            disabled={props.disabled}
            onChange={e => onChange(e.target, e.target.value)}
          />
          {props.error && <div class="invalid-feedback">{props.error}</div>}
        </div>
      </div>
    );

    return element;
  }
};
</script>

