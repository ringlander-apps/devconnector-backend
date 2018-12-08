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
    disabled: {
      type: Boolean
    }
  },
  render(h, { data, props, children }) {
    const onInput = data.on["input"];
    const inputElement = h("input", {
      class: data.class,
      on: {
        input: e => {
          onInput(e.target, e.target.value);
        }
      },
      domProps: {
        value: props.value,
        disabled: props.disabled
      },
      attrs: {
        type: data.attrs.type,
        placeholder: data.attrs.placeholder,
        name: data.attrs.name
      }
    });

    let elementChildren = [];

    elementChildren.push(inputElement);

    if (props.error) {
      const errorElement = h(
        "div",
        {
          class: "invalid-feedback"
        },
        [props.error]
      );
      elementChildren.push(errorElement);
    }
    if (props.info) {
      const infoElement = h(
        "small",
        {
          class: "form-text text-muted"
        },
        [props.info]
      );
      elementChildren.push(infoElement);
    }

    const wrapperElement = h(
      "div",
      {
        class: "form-group"
      },
      [...elementChildren]
    );

    return wrapperElement;
  }
};
</script>

