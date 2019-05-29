import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from '../Footer';

configure({ adapter: new Adapter() });

describe("<Footer />", () => {
  const wrapper = shallow(<Footer text="test" />);
  
  it("renders all HTML elements", () => {
    expect(wrapper.find('section').length).toBe(1);
    expect(wrapper.find('.container').length).toBe(1);
    expect(wrapper.find('.lead').length).toBe(1);
  });

  it("renders the given text in '.lead'", () => {
    expect(wrapper.find('.lead').text()).toBe('test');
  });
})