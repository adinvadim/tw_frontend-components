const createHandler = (
  {
    action = 'formAction',
    onSuccess = 'onFormSuccess',
    afterAction = 'afterFormAction',
    beforeAction = 'clearErrors',
    onError = 'updateErrors',
    validate,
  } = {},
) =>
  async function (value) {
    let validateFn;

    if (this[validate]) {
      validateFn = this[validate].bind(this);
    } else {
      validateFn =
        this.$refs.form && this.$refs.form.validate
          ? this.$refs.form.validate
          : v => true; // eslint-disable-line no-unused-vars
    }

    if (validateFn(value)) {
      if (this[beforeAction]) {
        this[beforeAction].call(this);
      }

      this.pending = true;

      try {
        const res = await this[action].call(this, value);

        if (this[onSuccess]) {
          this[onSuccess].call(this, res);
        }
      } catch (e) {
        if (e && e.response && e.response.data && this[onError]) {
          this[onError].call(this, e.response.data);
        } else {
          this[onError].call(this, e);
        }
      }

      this.pending = false;
      if (this[afterAction]) {
        this[afterAction].call(this);
      }
    }
  };

export default function (config) {
  return {
    data() {
      return {
        pending: false,
      };
    },

    methods: {
      handleSubmit: createHandler(config),
    },
  };
}
