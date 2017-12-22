/* eslint-disable */
import Vue from 'vue';
import { mount } from 'vue-test-utils';

import DjangoErrorMixin, { toVuetifyRule, fieldsListToObject, formErrors } from '@/common/mixins/djangoErrors/';

const fields = ['fieldA', 'fieldB'];

const template = {
  mixins: [DjangoErrorMixin(fields)],
  render(h) { return h() },
}

describe('DjangoErrorsMixin', () => {
  it('toVuetifyRule', (done) => {
    const res1 = toVuetifyRule('error');
    const res2 = toVuetifyRule(null);

    assert(res1 === 'error', 'shouldnt change origin error');
    assert(Array.isArray(res2), 'should replace null with empty array');
    done();
  });

  it('fieldListToObject', (done) => {
    const test = ['test1', 'test2', 'test3'];
    const res = fieldsListToObject(test);

    assert(typeof res === 'object');
    assert.deepEqual(res, { test1: null, test2: null, test3: null })
    done();
  });

  it('formErrors', (done) => {
    const test = { a: 'error', b: ['error', 'error'], c: null};
    const res = formErrors(test);

    assert.deepEqual(res, { ...test, c: [] });
    done();
  });

  it('initialize', (done) => {
    const wrapper = mount(template);

    fields.forEach((item) => {
      expect(wrapper.vm.errors).to.have.property(item)
    });
    done();
  });

  it('updateErrors', (done) => {
    const wrapper = mount(template);
    const test = { fieldA: 'error', fieldB: null};

    wrapper.vm.updateErrors(test);
    assert.deepEqual(wrapper.vm.errors, { ...test, fieldB: [] });
    assert.deepEqual(wrapper.vm.djangoErrors, { ...test });

    done();
  });

  it('clearErrors', (done) => {
    const test = { fieldA: 'error', fieldB: null};
    const wrapper = mount(template);

    wrapper.vm.updateErrors(test);
    wrapper.vm.clearErrors();

    assert.deepEqual(wrapper.vm.errors, {fieldA: [], fieldB: []});
    assert.deepEqual(wrapper.vm.djangoErrors, {fieldA: null, fieldB: null});
    

    done();
  });
});
