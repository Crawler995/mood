import {
  INIT_MOOD_SELECTIONS,
  TOGGLE_SETTINGS,
  SUBMIT_SETTINGS_FETCH_STARTED,
  SUBMIT_SETTINGS_FETCH_SUCCESS,
  SUBMIT_SETTINGS_FETCH_FAILURE,
  CHANGE_MOOD_SELECTIONS
} from './actionTypes';

import { fetchStatus } from '../../utils/otherUtil';

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_MOOD_SELECTIONS: {
      return {
        ...state,
        moodSelections: action.moodNames.map(item => true)
      };
    }

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
        moods: action.result.data,
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
    
    case CHANGE_MOOD_SELECTIONS: {
      return {
        ...state,
        moodSelections: state.moodSelections.map((selection, index) => 
          index === action.index ? !selection : selection
        )
      };
    }

    default: {
      return state;
    }
  }
}