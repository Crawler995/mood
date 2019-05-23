import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from '../Header';

configure({ adapter: new Adapter() });

describe("<Header />", () => {
  const wrapper = shallow(<Header title="test title" lead="test lead" />);

  it("renders all HTML elements", () => {
    expect(wrapper.find('section').length).toBe(1);
    expect(wrapper.find('.container').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('.lead').length).toBe(1);
  });

  it("renders the given title in 'h2'", () => {
    expect(wrapper.find('h2').text()).toBe('test title');
  });

  it("renders the given lead in '.lead'", () => {
    expect(wrapper.find('.lead').text()).toBe('test lead');
  });
})