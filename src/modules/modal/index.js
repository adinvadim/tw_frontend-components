import ModalContainerFactory from './TheModalContainerFactory';
import modalStore from './store';

export default (Vue, { store, modals }) => {
  if (!store) {
    throw new Error('[tw-modal-container]: you should provide store in plugins options');
  }

  store.registerModule('modal', modalStore);
  Vue.component('tw-modal-container', ModalContainerFactory(modals));
};
