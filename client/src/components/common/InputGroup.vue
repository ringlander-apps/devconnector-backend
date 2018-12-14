<script>
export default {
  functional: true,
  props: {
    value: {
      type: String,
      required: true
    },
    info: {
      type: String
    },
    error: {
      type: String
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  render(h, { data, props, children }) {
    const onChange = data.on["input"];
    let element = (
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class={props.icon} />
          </span>
        </div>
        <input
          name={data.attrs.name}
          class={data.class}
          placeholder={data.attrs.placeholder}
          type={data.attrs.type}
          value={props.value}
          onInput={e => onChange(e.target, e.target.value)}
        />
        {props.error && <div class="invalid-feedback">{props.error}</div>}
      </div>
    );
    return element;
  }
};
</script>
