import React from 'react';
import { mount, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import DatePicker from '../DatePicker';

configure({ adapter: new Adapter() });

const assertRenderAllHTMLElements = (wrapper) => {
  expect(wrapper.find('.container').length).toBe(1);
  expect(wrapper.find('.col-4').length).toBe(3);
  expect(wrapper.find('label').length).toBe(3);
  expect(wrapper.find('input').length).toBe(3);
};

const assertDefaultInputValue = (wrapper, defaultDate) => {
  const yearInput = wrapper.find('input').at(0);
  const monthInput = wrapper.find('input').at(1);
  const dayInput = wrapper.find('input').at(2);
  expect(yearInput.prop('value')).toBe(defaultDate.year);
  expect(monthInput.prop('value')).toBe(defaultDate.month);
  expect(dayInput.prop('value')).toBe(defaultDate.day);
};

const assertInputMin = (wrapper) => {
  const yearInput = wrapper.find('input').at(0);
  const monthInput = wrapper.find('input').at(1);
  const dayInput = wrapper.find('input').at(2);
  expect(yearInput.prop('min')).toBe(2019);
  expect(monthInput.prop('min')).toBe(1);
  expect(dayInput.prop('min')).toBe(1);
};

const assertInputMax = (wrapper, maxYear, maxMonth, maxDay) => {
  const yearInput = wrapper.find('input').at(0);
  const monthInput = wrapper.find('input').at(1);
  const dayInput = wrapper.find('input').at(2);
  expect(yearInput.html()).toMatch(`max="${maxYear}"`);
  expect(monthInput.html()).toMatch(`max="${maxMonth}"`);
  expect(dayInput.html()).toMatch(`max="${maxDay}"`);
};

const assertLabelText = (wrapper, defaultDate) => {
  expect(wrapper.find('label').at(0).text()).toBe(`${defaultDate.year}年`);
  expect(wrapper.find('label').at(1).text()).toBe(`${defaultDate.month}月`);
  expect(wrapper.find('label').at(2).text()).toBe(`${defaultDate.day}日`);
};

const assertDefaultStatus = (wrapper, defaultDate, maxYear, maxMonth, maxDay) => {
  it("renders all HTML elements", () => {
    assertRenderAllHTMLElements(wrapper);
  });

  it("set the state according to the props 'defaultDate'", () => {
    expect(wrapper.state('date')).toEqual(defaultDate);
  });

  it("set the correct date input range and date value", () => {
    assertInputMin(wrapper);
    assertInputMax(wrapper, maxYear, maxMonth, maxDay);
    assertDefaultInputValue(wrapper, defaultDate);
  });

  it("renders the correct text in the labels", () => {
    assertLabelText(wrapper, defaultDate);
  });
};

const assertDateChanged = (wrapper, fakeDateChanged, change, targetDate, 
                           targetChangeCount, maxYear, maxMonth, maxDay) => {
  const yearInput = wrapper.find('input').at(0);
  const monthInput = wrapper.find('input').at(1);
  const dayInput = wrapper.find('input').at(2);

  if(change.year) {
    yearInput.simulate('change', {
      target: {
        value: change.year + ''
      }
    });
  }
  if(change.month) {
    monthInput.simulate('change', {
      target: {
        value: change.month + ''
      }
    });
  }
  if(change.day) {
    dayInput.simulate('change', {
      target: {
        value: change.day + ''
      }
    });
  }
  
  wrapper.update();

  it("set the state and call the 'dateChanged' function in the props", () => {
    expect(wrapper.state().date).toEqual(targetDate);
    expect(fakeDateChanged.callCount).toBe(targetChangeCount);
  });

  it("set the correct date input range and date value", () => {
    assertInputMin(wrapper);
    assertInputMax(wrapper, maxYear, maxMonth, maxDay);
    assertLabelText(wrapper, targetDate);
  });
};


describe("<DatePicker />", () => {
  describe("the initial status", () => {
    describe("the defaultDate is in the current month", () => {
      const date = new Date();
      const fakeDateChanged = sinon.spy();
      const defaultDate = {
        year: date.getFullYear(), 
        month: date.getMonth() + 1,
        day: 1
      };
      const wrapper = mount(
        <DatePicker 
          defaultDate={defaultDate}
          dateChanged={fakeDateChanged} 
        />
      );

      assertDefaultStatus(
        wrapper, defaultDate, date.getFullYear(), 
        date.getMonth() + 1, date.getDate()
      );
    });
    
    describe("the defaultDate isn't in the current month and " + 
             "is in the current year" +
             "is in the month that has 31 days", () => {
      const date = new Date();
      const fakeDateChanged = sinon.spy();
      const defaultDate = {
        year: 2019, 
        month: 3,
        day: 1
      };
      const wrapper = mount(
        <DatePicker 
          defaultDate={defaultDate}
          dateChanged={fakeDateChanged} 
        />
      );

      assertDefaultStatus(wrapper, defaultDate, date.getFullYear(), date.getMonth() + 1, 31);
    });

    describe("the defaultDate isn't in the current month and " + 
             "is in the current year" +
             "is in the month that has 30 days", () => {
      const date = new Date();
      const fakeDateChanged = sinon.spy();
      const defaultDate = {
        year: 2019, 
        month: 4,
        day: 1
      };
      const wrapper = mount(
        <DatePicker 
          defaultDate={defaultDate}
          dateChanged={fakeDateChanged} 
        />
      );

      assertDefaultStatus(wrapper, defaultDate, date.getFullYear(), date.getMonth() + 1, 30);
    });
  });
  
  describe("the date is changed", () => {
    describe("no special condition", () => {
      const defaultDate = {
        year: 2019, 
        month: 2,
        day: 21
      };
      const fakeDateChanged = sinon.spy();
      const wrapper = mount(
        <DatePicker 
          defaultDate={defaultDate}
          dateChanged={fakeDateChanged} 
        />
      );
      const newDate = {
        year: 2019, 
        month: 3,
        day: 31
      };
      const date = new Date();

      assertDateChanged(
        wrapper, fakeDateChanged, newDate, newDate, 3,
        date.getFullYear(), date.getMonth() + 1, 31
      );
    });

    describe("the former dayInput max value is different from the later dayInput max value" + 
             "e.g. 2019-3-1 to 2019-4-1", () => {
      const defaultDate = {
        year: 2019, 
        month: 3,
        day: 1
      };
      const fakeDateChanged = sinon.spy();
      const wrapper = mount(
        <DatePicker 
          defaultDate={defaultDate}
          dateChanged={fakeDateChanged} 
        />
      );
      const change = {
        month: 4
      };
      const targetDate = {
        year: 2019,
        month: 4,
        day: 1
      };
      const date = new Date();

      assertDateChanged(
        wrapper, fakeDateChanged, change, targetDate, 1,
        date.getFullYear(), date.getMonth() + 1, 30
      );
    });

    describe("the former day is larger than the later dayInput max value" + 
             "e.g. 2019-3-31 to 2019-2-28", () => {
      const defaultDate = {
        year: 2019, 
        month: 3,
        day: 31
      };
      const fakeDateChanged = sinon.spy();
      const wrapper = mount(
        <DatePicker 
          defaultDate={defaultDate}
          dateChanged={fakeDateChanged} 
        />
      );
      const change = {
        month: 2
      };
      const targetDate = {
        year: 2019,
        month: 2,
        day: 28
      };
      const date = new Date();

      assertDateChanged(
        wrapper, fakeDateChanged, change, targetDate, 2,
        date.getFullYear(), date.getMonth() + 1, 28
      );
    });
  });
})