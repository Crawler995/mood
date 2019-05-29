import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { actions } from '../index';
import {
  SELECT_MOOD_BTN_CLICKED,
  ADD_MOOD_BTN,
  SUBMIT_MOOD_CONTENT
} from '../actionTypes';

describe("now/actions", () => {
  describe("selectMoodBtnClicked", () => {
    it("creates an action 'selectMoodBtnClicked'", () => {
      const action = actions.selectMoodBtnClicked(0);
      expect(action.type).toBe(SELECT_MOOD_BTN_CLICKED);
      expect(action.btnIndex).toBe(0);
    });
  });

  describe("addMoodBtn", () => {
    it("creates an action 'addMoodBtn'", () => {
      const action = actions.addMoodBtn('test');
      expect(action.type).toBe(ADD_MOOD_BTN);
      expect(action.moodName).toBe('test');
    });
  });
})