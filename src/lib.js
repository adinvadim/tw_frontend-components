import formMixin from './common/mixins/form';
import djangoErrorsMixins from './common/mixins/djangoErrors';
import modalMixin from './modules/modal/mixin';
import shortpollComponent from './common/components/BaseShortpoll/';
import ethAddressComponent from './common/components/BaseEthAddress/';
import modalContainer from './modules/modal';


export const FormMixin = formMixin;
export const DjangoErrorsMixins = djangoErrorsMixins;
export const ModalMixin = modalMixin;
export const ShortpollComponent = shortpollComponent;
export const EthAddressComponent = ethAddressComponent;
export const ModalContainer = modalContainer;

export default (Vue) => {
  Vue.use(ShortpollComponent);
  Vue.use(EthAddressComponent);
  Vue.use(ModalContainer);
};

