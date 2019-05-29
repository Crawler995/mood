import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { actions } from '../index';
import {
  TOGGLE_SETTINGS,
  SUBMIT_SETTINGS
} from '../actionTypes';

describe("past/moodData/actions", () => {
  describe("toggleSettings", () => {
    it("creates an action 'toggleSettings'", () => {
      const action = actions.toggleSettings();
      expect(action.type).toBe(TOGGLE_SETTINGS);
    });
  });
})