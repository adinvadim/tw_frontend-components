export default {
  namespaced: true,

  state: {
    type: null,
    props: null,
  },

  mutations: {
    show(state, { type, props }) {
      state.type = type;
      state.props = props;
    },

    hide(state) {
      state.type = null;
      state.props = null;
    },
  },
};
