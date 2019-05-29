import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { actions, reducer, defaultState } from '../index';

describe("past/moodData/reducer", () => {
  describe("toggleSettings", () => {
    it("returns the state that the toggleBtnText is changed", () => {
      const action = actions.toggleSettings();
      const newState = reducer({...defaultState}, action);

      expect(newState.toggleBtnText).toBe('收起选项');
    });
  });

  describe("submitSettings", () => {
    it("returns the state that nothing is changed", () => {
      const action = actions.submitSettings();
      const newState = reducer({...defaultState}, action);

      expect(newState).toEqual(defaultState);
    });
  });
})