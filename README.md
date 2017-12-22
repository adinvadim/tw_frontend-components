# @tw-core/components

> Components library of takewing.co

## Установка

``` bash
npm install -S ssh://git@10.8.0.22:9155/services/tw_frontend-components.git

```

## Использование
``` js
// main.js
import Vue from 'vue';
import MyModal from '../MyModal';
import Components from '@tw-core/components';

//установит глобально все компоненты из библиотеки
Vue.use(Components, {
  store,
  modals: {
    myModal: MyModal,
  },
});
```


## Установка нужных компонентов
``` js
// main.js
import Vue from 'vue';
import MyModal from '../MyModal';

//eth-address
import { EthAddressComponent } from '@tw-core/components';

Vue.use(EthAddressComponent); // компонент доступен глобально как <tw-eth-address />

//shortpoll
import { ShortpollComponent } from '@tw-core/components';

Vue.use(ShortpollComponent); // <tw-shortpoll />

//modal
import { ModalContainer } from '@tw-core/components';

Vue.use(ModalContainer, { // <tw-modal-container />
  store,
  modals: { 
    MyModal,
  },
}); 

```

## Миксины
``` js
//some-component-js
import { FormMixin } from '@tw-core/components';

export default {
  mixins: [FormMixin],
};
```


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
