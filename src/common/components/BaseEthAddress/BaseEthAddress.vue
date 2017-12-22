<template>
  <v-chip class="eth-address subheading">
    {{ truncated }}
    <v-tooltip v-if="isCopy" right>
      <v-icon slot="activator" class="eth-address__action">content_copy</v-icon>
      Копировать в буфер обмена
    </v-tooltip>
  </v-chip>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    isCopy: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      clipboardInstance: null,
    };
  },
  computed: {
    truncated() {
      return `${this.value.slice(0, 6)}...${this.value.slice(-4)}`;
    },
  },
  watch: {
    isCopy(v) {
      if (v) {
        this.createClipboard();
      } else {
        this.destroyClipboard();
      }
    },
  },
  mounted() {
    if (this.isCopy) {
      this.createClipboard();
    }
  },
  methods: {
    createClipboard() {
      // eslint-disable-next-line no-new
      this.clipboardInstance = new Clipboard('.eth-address__action', {
        text: () => this.getValue(),
      });
    },
    destroyClipboard() {
      this.clipboardInstance.destroy();
      this.clipboardInstance = null;
    },

    getValue() {
      return this.value;
    },
  },
};
</script>

<style lang="stylus">
.base-eth-address {
  display: inline-flex;

  &__action {
    margin-left: 8px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
