import React from 'react';
import { mount, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import DateRangePicker from '../DateRangePicker';
import DatePicker from '../DatePicker';

configure({ adapter: new Adapter() });

describe("<DateRangePicker />", () => {
  describe("the initial status", () => {
    const defaultStartDate = {
      year: 2019,
      month: 3,
      day: 1
    };
    const defaultEndDate = {
      year: 2019,
      month: 4,
      day: 1
    };

    const wrapper = mount(
      <DateRangePicker
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
      />
    );

    it("set the state according to the props", () => {
      expect(wrapper.state().dateRange.startDate).toEqual(defaultStartDate);
      expect(wrapper.state().dateRange.endDate).toEqual(defaultEndDate);
    });

    it("renders two DatePicker that has the correct props", () => {
      expect(wrapper.find(DatePicker).length).toBe(2);
      expect(wrapper.find(DatePicker).at(0).prop('defaultDate')).toEqual(defaultStartDate);
      expect(wrapper.find(DatePicker).at(1).prop('defaultDate')).toEqual(defaultEndDate);
    });

    it("change the state on input value changed", () => {
      expect(wrapper.state().dateRange.startDate.month).toBe(defaultStartDate.month);

      const setStartDateSpy = sinon.spy(wrapper.instance(), 'setStartDate');
      const setEndDateSpy = sinon.spy(wrapper.instance(), 'setEndDate');
      wrapper.instance().forceUpdate();

      wrapper.find('input').at(1).simulate('change', {
        target: {
          value: '2'
        }
      });
      wrapper.update();

      expect(setStartDateSpy.callCount).toBe(1);
      expect(wrapper.state().dateRange.startDate.month).toBe(2);

      wrapper.find('input').at(5).simulate('change', {
        target: {
          value: '22'
        }
      });
      wrapper.update();

      expect(setEndDateSpy.callCount).toBe(1);
      expect(wrapper.state().dateRange.endDate.day).toBe(22);
    });
  });
});