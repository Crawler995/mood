import {
  SUBMIT_REGISTER_USERINFO_FETCH_STARTED,
  SUBMIT_REGISTER_USERINFO_FETCH_SUCCESS,
  SUBMIT_REGISTER_USERINFO_FETCH_FAILURE,
  USERNAME_EXISTED_FAILURE
} from './actionTypes';

import { fetchStatus } from '../utils/otherUtil';

export default (state = {}, action) => {
  switch(action.type) {
    case SUBMIT_REGISTER_USERINFO_FETCH_STARTED: {
      return {
        registerStatus: fetchStatus.LOADING
      };
    }

    case SUBMIT_REGISTER_USERINFO_FETCH_SUCCESS: {
      return {
        registerStatus: fetchStatus.LOADING,
        username: action.result.data.username,
        registerDate: action.result.data.registerDate,
        
      };
    }

    case SUBMIT_REGISTER_USERINFO_FETCH_FAILURE: {
      return {

      };
    }

    case USERNAME_EXISTED_FAILURE: {
      return {

      };
    }

    default: {
      return state;
    }
  }
}