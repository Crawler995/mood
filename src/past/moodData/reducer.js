import {
  TOGGLE_SETTINGS,
  SUBMIT_SETTINGS_FETCH_STARTED,
  SUBMIT_SETTINGS_FETCH_SUCCESS,
  SUBMIT_SETTINGS_FETCH_FAILURE
} from './actionTypes';

import { fetchStatus } from '../../utils/otherUtil';

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS: {
      return {
        ...state,
        toggleBtnText: state.toggleBtnText === '展开选项' ? '收起选项' : '展开选项'
      };
    }

    case SUBMIT_SETTINGS_FETCH_STARTED: {
      return {
        ...state,
        submitSettingsStatus: fetchStatus.LOADING
      };
    }

    case SUBMIT_SETTINGS_FETCH_SUCCESS: {
      return {
        ...state,
        moodNum: action.result.data,
        submitSettingsStatus: fetchStatus.SUCCESS,
        moodDateRangeText: action.moodDateRangeText
      };
    }

    case SUBMIT_SETTINGS_FETCH_FAILURE: {
      return {
        ...state,
        submitSettingsStatus: fetchStatus.FAILURE
      };
    }

    default: {
      return state;
    }
  }
}