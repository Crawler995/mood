import {
  GET_USER_RECORD_FETCH_STARTED,
  GET_USER_RECORD_FETCH_SUCCESS,
  GET_USER_RECORD_FETCH_FAILURE
} from './actionTypes';

import { fetchStatus } from '../../utils/otherUtil';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_USER_RECORD_FETCH_STARTED: {
      return {
        ...state,
        getUserRecordStatus: fetchStatus.LOADING
      };
    }

    case GET_USER_RECORD_FETCH_SUCCESS: {
      return {
        ...state,
        getUserRecordStatus: fetchStatus.SUCCESS,
        totalMoodNum: action.result.data.totalMoodNum,
        totalMoodNameNum: action.result.data.totalMoodNameNum,
        mostMoodName: action.result.data.mostMoodName
      };
    }

    case GET_USER_RECORD_FETCH_FAILURE: {
      return {
        ...state,
        getUserRecordStatus: fetchStatus.FAILURE
      };
    }

    default: {
      return state;
    }
  }
}