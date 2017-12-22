
import { mapState, mapMutations } from 'vuex';


export default modalTypes => ({
  data() {
    return {
      isOpened: true,
    };
  },

  computed: mapState({
    type: state => state.modal.type,
    props: state => state.modal.props,
  }),

  methods: mapMutations({
    close: 'modal/hide',
  }),

  render(h) {
    if (this.type != null) {
      return h(modalTypes[this.type], {
        on: {
          close: this.close,
        },

        props: {
          value: this.isOpened,
          ...this.props,
        },
      });
    }

    return null;
  },
});

