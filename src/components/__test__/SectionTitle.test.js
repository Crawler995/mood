import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SectionTitle from '../SectionTitle';

configure({ adapter: new Adapter() });

describe("<SectionTitle />", () => {
  const wrapper = shallow(<SectionTitle text="test" />);

  it("renders all HTML elements", () => {
    expect(wrapper.find('h3').length).toBe(1);
  });

  it("renders the given text in 'h3'", () => {
    expect(wrapper.find('h3').text()).toBe('test');
  })
})