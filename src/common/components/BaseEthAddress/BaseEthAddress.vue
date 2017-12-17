<template>
  <v-chip class="base-eth-address subheading">
    {{ truncated }}
    <v-tooltip v-if="isCopy" class="ml-2" right>
      <v-icon slot="activator" class="base-eth-address__action">content_copy</v-icon>
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
      return `${this.value.substring(0, 6)}...${this.value.substring(
        this.value.length - 4,
        this.value.length,
      )}`;
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
      this.clipboardInstance = new Clipboard('.base-eth-address__action', {
        text: () => this.value,
      });
    },
    destroyClipboard() {
      this.clipboardInstance.destroy();
      this.clipboardInstance = null;
    },
  },
};
</script>

<style lang="stylus">
.base-eth-address {
  display: inline-flex;
  font-size: 16px;

  &__action {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
