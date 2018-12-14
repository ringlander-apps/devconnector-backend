<script>
export default {
  functional: true,
  props: {
    options: {
      type: Array
    },
    value: {
      type: String
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
  onSelected(event) {},
  render(h, { data, props, children }) {
    const onSelected = data.on["change"];
    let selectOptions = props.options.map(option => {
      return (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      );
    });
    let wrapperElement = (
      <div class="form-group">
        <select
          name={data.attrs.name}
          class={data.class}
          onChange={e => onSelected(e.target, e.target.value)}
          value={props.value}
        >
          {selectOptions}
        </select>
        {props.error && <div class="invalid-feedback">{props.error}</div>}
        {props.info && <small class="form-text text-muted">{props.info}</small>}
      </div>
    );
    return wrapperElement;
  }
};
</script>
