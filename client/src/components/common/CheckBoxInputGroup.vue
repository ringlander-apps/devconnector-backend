<script>
export default {
  functional: true,
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  render(h, { data, props, children }) {
    const onChange = data.on["change"];
    let element = (
      <div class="form-check mb-4">
        <input
          class={data.class}
          type="checkbox"
          name={data.attrs.name}
          onChange={e => onChange(e.target, e.target.checked)}
          checked={data.attrs.checked}
          disabled={props.disabled}
        />
        <label class="form-check-label" HtmlFor={data.attrs.name}>
          {props.label}
        </label>
      </div>
    );

    return element;
  }
};
</script>

