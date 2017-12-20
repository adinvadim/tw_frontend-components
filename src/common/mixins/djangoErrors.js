import fp from 'lodash/fp';

/**
 * Return Object with keys from array in null values
 *
 * @param {Array} arr Array of field
 * @returns {Object}
 */
export const fieldsListToObject = fp.reduce((acc, e) => fp.assoc(e, null)(acc), {});

export const toVuetifyRule = err => (fp.isNull(err) ? [] : err);

/**
 * Convert django errors to vuetify text-field rules
 *
 * @param {Object} errors Django errors dict
 * @return {Object}
 */
export const formErrors = fp.mapValues(toVuetifyRule);

export default function factory(fields) {
  let arrFields = fields;
  if (typeof fields === 'string') {
    arrFields = [fields];
  }
  return {
    data() {
      return {
        djangoErrors: fieldsListToObject(arrFields),
      };
    },
    computed: {
      errors() {
        return formErrors(this.djangoErrors);
      },
    },

    methods: {
      updateErrors(errors) {
        this.clearErrors();
        this.djangoErrors = { ...this.djangoErrors, ...errors };
      },

      clearErrors() {
        this.djangoErrors = fieldsListToObject(arrFields);
      },

    },
  };
}
