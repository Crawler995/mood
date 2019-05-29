import {
  AUTH_BY_JWT_FETCH_STARTED,
  AUTH_BY_JWT_FETCH_SUCCESS,
  AUTH_BY_JWT_FETCH_FAILURE,
  AUTH_BY_USERINFO_FETCH_STARTED,
  AUTH_BY_USERINFO_FETCH_SUCCESS,
  AUTH_BY_USERINFO_FETCH_FAILURE,
  TOGGLE_AUTH_MODE,
  SUBMIT_REGISTER_USERINFO_FETCH_STARTED,
  SUBMIT_REGISTER_USERINFO_FETCH_SUCCESS,
  SUBMIT_REGISTER_USERINFO_FETCH_FAILURE,
  USERNAME_EXISTED_FAILURE
} from './actionTypes';
import { authMode } from './constants';

import { fetchStatus } from '../utils/otherUtil';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_BY_JWT_FETCH_STARTED: {
      return {
        ...state,
        authStatus: fetchStatus.LOADING
      };
    }

    case AUTH_BY_JWT_FETCH_SUCCESS: {
      return {
        ...state,
        authStatus: fetchStatus.SUCCESS,
        username: action.result.data.username,
        registerDate: action.result.data.registerDate,
        defaultMoodNames: action.result.data.defaultMoodNames,
        usedMoodNames: action.result.data.usedMoodNames
      };
    }

    case AUTH_BY_JWT_FETCH_FAILURE: {
      return {
        ...state,
        authStatus: fetchStatus.FAILURE
      };
    }


    case AUTH_BY_USERINFO_FETCH_STARTED: {
      return {
        ...state,
        authStatus: fetchStatus.LOADING
      };
    }

    case AUTH_BY_USERINFO_FETCH_SUCCESS: {
      return {
        ...state,
        authStatus: fetchStatus.SUCCESS,
        username: action.result.data.username,
        registerDate: action.result.data.registerDate,
        defaultMoodNames: action.result.data.defaultMoodNames,
        usedMoodNames: action.result.data.usedMoodNames
      }
    }

    case AUTH_BY_USERINFO_FETCH_FAILURE: {
      return {
        ...state,
        authStatus: fetchStatus.FAILURE
      }
    }

    case TOGGLE_AUTH_MODE: {
      return {
        ...state,
        authMode: state.authMode === authMode.REGISTER ? authMode.LOGIN : authMode.REGISTER
      };
    }

    case SUBMIT_REGISTER_USERINFO_FETCH_STARTED: {
      return {
        ...state,
        authStatus: fetchStatus.LOADING
      };
    }

    case SUBMIT_REGISTER_USERINFO_FETCH_SUCCESS: {
      return {
        ...state,
        authStatus: fetchStatus.SUCCESS,
        username: action.result.data.username,
        registerDate: action.result.data.registerDate,
        defaultMoodNames: action.result.data.defaultMoodNames,
        usedMoodNames: action.result.data.usedMoodNames
      };
    }

    case SUBMIT_REGISTER_USERINFO_FETCH_FAILURE: {
      return {
        ...state,
        authStatus: fetchStatus.FAILURE
      };
    }

    case USERNAME_EXISTED_FAILURE: {
      return {
        ...state,
        authStatus: fetchStatus.CONFLICT_FAILURE
      };
    }

    default: {
      return state;
    }
  }
}