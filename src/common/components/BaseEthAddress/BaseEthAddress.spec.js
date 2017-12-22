/* eslint-disable */
import BaseEthAddress from './BaseEthAddress';
import { mount } from 'vue-test-utils';

const template =

describe('BaseEthAddress', () => {
  it('classes', done => {
    const wrapper = mount(BaseEthAddress, { propsData: { value: '0xepwoqjfjwefoiwjiefj[pqwief' }});

    expect(wrapper.classes()).to.contain('base-eth-address');
    expect(wrapper.find('.base-eth-address__action').element).to.exist;
    done();
  });

  it('getValue', done => {
    const value = '0xepwoqjfjwefoiwjiefj[pqwief';
    const wrapper = mount(BaseEthAddress, { propsData: { value }});
    const test = wrapper.vm.getValue()

    assert(test, value);
    done();
  });

  it('isCopy', done => {
    const value = '0xepwoqjfjwefoiwjiefj[pqwief';
    const wrapper = mount(BaseEthAddress, { propsData: { value, isCopy: false }});
    const test = wrapper.vm.getValue()

    expect(wrapper.find('.base-eth-address__action').element).to.not.exist;
    done();
  });

  it('truncated', done => {
    const value = '0x30298r023uf023ur2830rej230r';
    const wrapper = mount(BaseEthAddress, { propsData: { value }});

    assert(wrapper.vm.truncated.length <= 13);
    assert(wrapper.vm.truncated.indexOf('...') > 0);
    assert(wrapper.vm.truncated.split('...')[0] === '0x30298r023uf023ur2830rej230r'.slice(0, 6));
    assert(wrapper.vm.truncated.split('...')[1] === '0x30298r023uf023ur2830rej230r'.slice(-4));
    
    done();
  });
});