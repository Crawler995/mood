import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import SelectMoodBtn from '../SelectMoodBtn';

configure({ adapter: new Adapter() });

describe("<SelectMoodBtn />", () => {
  const wrapper = shallow(
    <SelectMoodBtn
      text="test"
      isSelected={true}
      clickHandle={undefined}
    />
  );

  it("renders all HTML elements", () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });

  it("renders the given text in 'button'", () => {
    expect(wrapper.find('button').text()).toMatch('test');
  });

  it("renders '√' in 'button'", () => {
    expect(wrapper.find('span').text()).toBe('√');
  });

  it("the '√' is shown when the prop 'isSelected' is true", () => {
    wrapper.setProps({
      isSelected: true
    });

    expect(wrapper.find('span')
      .matchesElement(
        <span 
          style={{
            position: 'absolute',
            right: '10%',
            opacity: 1
          }}
        >√</span>)
      ).toBe(true);
  });

  it("the '√' is unshown when the prop 'isSelected' is false", () => {
    wrapper.setProps({
      isSelected: false
    });

    expect(wrapper.find('span')
      .matchesElement(
        <span 
          style={{
            position: 'absolute',
            right: '10%',
            opacity: 0
          }}
        >√</span>)
      ).toBe(true);
  });

  it("the 'clickHandle' is called when the button is clicked", () => {
    const onButtonClick = sinon.spy();
    wrapper.setProps({
      clickHandle: onButtonClick
    });
    wrapper.find('button').simulate('click');

    expect(onButtonClick.callCount).toBe(1);
  })
})