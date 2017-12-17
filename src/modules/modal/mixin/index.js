export default {
  computed: {
    isDialogVisible: {
      get() {
        return true;
      },

      set(v) {
        if (!v) {
          this.closeSelf();
        }
      },
    },
  },

  methods: {
    closeSelf() {
      this.$emit('close');
    },
  },
};
