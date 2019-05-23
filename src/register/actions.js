import {
  SUBMIT_REGISTER_USERINFO,
  SUBMIT_REGISTER_USERINFO_FETCH_STARTED,
  SUBMIT_REGISTER_USERINFO_FETCH_SUCCESS,
  SUBMIT_REGISTER_USERINFO_FETCH_FAILURE,
  USERNAME_EXISTED_FAILURE
} from './actionTypes';

import axios from 'axios';

export const submitRegisterUserInfo = (username, password) => {
  return (dispatch) => {
    const submitRegisterUserInfoUrl = 'users';

    dispatch(submitRegisterUserInfoFetchStarted());

    axios.post(submitRegisterUserInfoUrl, {
      username,
      password
    })
    .then(res => {
      dispatch(submitRegisterUserInfoFetchSuccess(res));
    })
    .catch(err => {
      if(err.code === 409) {
        dispatch(usernameExistedFailure());
      } else {
        dispatch(submitRegisterUserInfoFetchFailure(err));
      }
    });
  }
}

export const submitRegisterUserInfoFetchStarted = () => ({
  type: SUBMIT_REGISTER_USERINFO_FETCH_STARTED
});

export const submitRegisterUserInfoFetchSuccess = (result) => ({
  type: SUBMIT_REGISTER_USERINFO_FETCH_SUCCESS,
  result
});

export const submitRegisterUserInfoFetchFailure = (error) => ({
  type: SUBMIT_REGISTER_USERINFO_FETCH_FAILURE,
  error
});

export const usernameExistedFailure = () => ({
  type: USERNAME_EXISTED_FAILURE
});