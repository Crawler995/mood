import {
  INIT_MOOD_SELECTIONS,
  SELECT_MOOD_BTN_CLICKED,
  ADD_MOOD_BTN,
  SUBMIT_MOOD_CONTENT_FETCH_STARTED,
  SUBMIT_MOOD_CONTENT_FETCH_SUCCESS,
  SUBMIT_MOOD_CONTENT_FETCH_FAILURE
} from './actionTypes';

import { fetchStatus } from '../utils/otherUtil';

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_MOOD_SELECTIONS: {
      return {
        ...state,
        moodNames: action.defaultMoodNames,
        moodSelections: action.defaultMoodNames.map(item => false)
      };
    }

    case SELECT_MOOD_BTN_CLICKED: {
      return {
        ...state,
        moodSelections: state.moodSelections.map((moodSelection, btnIndex) => 
          btnIndex === action.btnIndex
            ? !moodSelection
            : moodSelection
        )
      };
    }

    case ADD_MOOD_BTN: {
      return {
        ...state,
        moodNames: [...state.moodNames, action.moodName],
        moodSelections: [...state.moodSelections, true]
      };
    }

    case SUBMIT_MOOD_CONTENT_FETCH_STARTED: {
      return {
        ...state,
        submitMoodContentStatus: fetchStatus.LOADING
      };
    }

    case SUBMIT_MOOD_CONTENT_FETCH_SUCCESS: {
      return {
        ...state,
        moodSelections: state.moodSelections.map(item => false),
        submitMoodContentStatus: fetchStatus.SUCCESS,
        usedMoodNames: [...action.selectMoods]
      }
    }

    case SUBMIT_MOOD_CONTENT_FETCH_FAILURE: {
      return {
        ...state,
        submitMoodContentStatus: fetchStatus.FAILURE
      }
    }

    default: {
      return state;
    }
  }
} 