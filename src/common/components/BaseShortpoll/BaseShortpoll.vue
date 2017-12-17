<script>
export default {
  props: {
    interval: {
      type: Number,
      default: () => 3000,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      activeInterval: null,
      blurred: false,
    };
  },

  watch: {
    active(v) {
      if (v) {
        this.start();
      } else {
        this.stop();
      }
    },
  },

  mounted() {
    this.start();

    window.addEventListener('blur', this.onBlur.bind(this));
    window.addEventListener('focus', this.onFocus.bind(this));
  },

  destroyed() {
    this.stop();

    window.removeEventListener('blur', this.onBlur.bind(this));
    window.removeEventListener('focus', this.onFocus.bind(this));
  },

  methods: {
    start() {
      if (!this.activeInterval) {
        this.activeInterval = setInterval(
          this.trigger.bind(this),
          this.interval,
        );
      }
    },

    onBlur() {
      this.stop();

      this.blurred = true;
    },

    onFocus() {
      if (this.blurred) {
        this.start();

        this.blurred = false;
      }
    },

    stop() {
      if (this.activeInterval) {
        clearInterval(this.activeInterval);

        this.activeInterval = null;
      }
    },

    trigger() {
      this.$emit('action');
    },
  },

  render(h) {
    return h();
  },
};
</script>
