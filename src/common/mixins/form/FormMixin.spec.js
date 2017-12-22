/* eslint-disable */
import Vue from 'vue';
import FormMixin from '@/common/mixins/form/';
import { mount } from 'vue-test-utils';

const beforeFormAction = sinon.spy();
const afterFormAction = sinon.spy();
const onFormError = sinon.spy();
const onFormSuccess = sinon.spy();
const formAction = sinon.spy();

const setupHooks = () => ({
  formAction: sinon.spy(),
  beforeFormAction: sinon.spy(),
  onFormError: sinon.spy(),
  onFormSuccess: sinon.spy(),
  afterFormAction: sinon.spy(),
});

const setupFormMixin = (methods, config = {}) => {
  const template = {
    render(h) {
      return h();
    },
    mixins: [
      FormMixin({
        beforeAction: 'beforeFormAction',
        onError: 'onFormError',
        ...config,
      }),
    ],

    methods,
  };

  const wrapper = mount(template);
  return wrapper.vm;
};

const formMixinTemplate = {
  render(h) {
    return h();
  },
  mixins: [
    FormMixin({
      beforeAction: 'beforeFormAction',
      onError: 'onFormError',
    }),
  ],
  methods: {
    onFormSuccess,
    onFormError,
    beforeFormAction,
    afterFormAction,
    formAction,
  },
};

describe('FormMixin', () => {
  it('beforeFormAction', (done) => {
    const hooks = setupHooks();
    const vm = setupFormMixin(hooks);

    vm
      .handleSubmit()
      .then(() => expect(hooks.beforeFormAction.calledOnce).to.be.equal(true))
      .then(() => done())
      .catch(console.error);
  });

  it('afterFormAction', (done) => {
    const hooks = setupHooks();
    const vm = setupFormMixin(hooks);

    vm
      .handleSubmit()
      .then(() => expect(hooks.afterFormAction.calledOnce).to.be.equal(true))
      .then(() => done())
      .catch(console.error);
  });

  it('formAction arguments', (done) => {
    const hooks = setupHooks();
    const vm = setupFormMixin(hooks);
    const value = { a: 1 };

    vm.handleSubmit(value).then(() => {
      assert(//eslint-disable-line
        value === hooks.formAction.lastCall.args[0],
        'formAction args should be handleSubmit arguments',
      );
      return done();
    })
    .catch(console.error);
  });

  it('onFormSuccess', (done) => {
    const formAction = () => new Promise(resolve => setTimeout(resolve, 300));

    const hooks = setupHooks();
    hooks.formAction = formAction;

    const vm = setupFormMixin(hooks);


    vm
      .handleSubmit()
      .then(() => {
        expect(hooks.onFormSuccess.called).to.be.equal(true);
        expect(hooks.onFormError.called).to.not.be.equal(true);
      })
      .then(done)
      .catch(done);
  });

  it('onFormSuccess arguments', (done) => {
    const response = { response: 'Успех!' };
    const formAction = () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(response), 300),
      );

    const hooks = setupHooks();
    hooks.formAction = formAction;

    const vm = setupFormMixin(hooks);

    vm
      .handleSubmit()
      .then(() => {
        assert(
          response === hooks.onFormSuccess.lastCall.args[0],
          'onSuccess args should be action response',
        );
      })
      .then(done)
      .catch(done);
  });

  it('onFormError', (done) => {
    const formAction = () =>
      new Promise((resolve, reject) => setTimeout(reject, 300));
    const hooks = setupHooks();
    hooks.formAction = formAction;

    const vm = setupFormMixin(hooks);

    vm
      .handleSubmit()
      .then(() => {
        expect(hooks.onFormSuccess.calledOnce).to.not.be.equal(true);
        expect(hooks.onFormError.calledOnce).to.be.equal(true);
      })
      .then(done)
      .catch(done);
  });

  it('onFormError arguments', (done) => {
    const error = { error: 'Ошибка!' };
    const formAction = () =>
      new Promise((resolve, reject) => setTimeout(() => reject(error), 300));
    const hooks = setupHooks();
    hooks.formAction = formAction;

    const vm = setupFormMixin(hooks);

    vm
      .handleSubmit()
      .then(() => {
        assert(
          error === hooks.onFormError.lastCall.args[0],
          'onError args should be action error',
        );
      })
      .then(done)
      .catch(done);
  });

  it('hooks order', (done) => {
    const formAction = sinon.spy(
      () => new Promise((resolve, reject) => setTimeout(resolve, 300)),
    );
    const hooks = setupHooks();
    hooks.formAction = formAction;

    const vm = setupFormMixin(hooks);

    vm
      .handleSubmit()
      .then(() => {
        expect(
          hooks.beforeFormAction.calledImmediatelyBefore(hooks.formAction),
        ).to.be.equal(true, true, 'beforeFormAction is not before formAction');
        expect(hooks.formAction.calledImmediatelyBefore(hooks.onFormSuccess)).to.be.equal(
          true,
          true,
          'onFormSuccess is not after formAction',
        );
        expect(
          hooks.afterFormAction.calledImmediatelyAfter(hooks.onFormSuccess),
        ).to.be.equal(true, true, 'afterFormAction is not after onFormSuccess');
      })
      .then(done)
      .catch(done);
  });

  it('pending', (done) => {
    const formAction = () =>
      new Promise((resolve, reject) => setTimeout(resolve, 300));
    const hooks = setupHooks();
    hooks.formAction = formAction;

    const vm = setupFormMixin(hooks);

    expect(vm.pending).to.not.be.equal(true);

    new Promise((resolve, reject) => {
      vm.handleSubmit().then(resolve);
      expect(vm.pending).to.be.equal(true);
    })
      .then(() => {
        expect(vm.pending).to.not.be.equal(true);
      })
      .then(done)
      .catch(done);
  });

  it('validation', (done) => {
    const hooks = setupHooks();
    hooks.validate = sinon.spy(() => true);
    const vm = setupFormMixin(hooks, { validate: 'validate'});

    vm.handleSubmit().then(() => {
      expect(hooks.validate.calledOnce).to.be.equal(true);
      done();
    });
  });

  it('validation:positive', (done) => {
    const hooks = setupHooks();
    hooks.validate = sinon.spy(() => true);
    const vm = setupFormMixin(hooks, { validate: 'validate'});

    vm.handleSubmit().then(() => {
      expect(hooks.validate.calledOnce).to.be.equal(true);
      expect(hooks.formAction.calledOnce).to.be.equal(true);
      done();
    });
  });

  it('validation:negative', (done) => {
    const hooks = setupHooks();
    hooks.validate = sinon.spy(() => false);
    const vm = setupFormMixin(hooks, { validate: 'validate'});

    vm.handleSubmit().then(() => {
      expect(hooks.validate.calledOnce).to.be.equal(true);
      expect(hooks.formAction.calledOnce).to.be.not.equal(true);
      done();
    });
  });
});
