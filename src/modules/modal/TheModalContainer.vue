<script>
import { mapState, mapMutations } from 'vuex';
import VerificationDialog from '@/domains/debtor/components/TheVerificationDialog/TheVerificationDialog';
import AcceptFactoringDialog from '@/common/components/TheAcceptFactoringDialog/TheAcceptFactoringDialog';
import ConfirmDeliveryDialog from '@/common/components/TheConfirmDeliveryDialog/TheConfirmDeliveryDialog';

const modalTypes = {
  debitorVerification: VerificationDialog,
  acceptFactoring: AcceptFactoringDialog,
  confirmDelivery: ConfirmDeliveryDialog,
};

export default {
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
};
</script>
