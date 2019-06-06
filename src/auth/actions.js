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

import axios from 'axios';

export const authByJWT = () => {
  return (dispatch) => {
    const authByJWTUrl = '/api/users/auth';

    dispatch(authByJWTFetchStarted());

    axios.get(authByJWTUrl, {
      "headers": {
        'Authorization': 'jwt ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(authByJWTFetchSuccess(res));
    })
    .catch(err => {
      dispatch(authByJWTFetchFailure(err));
    });
  }
};

export const authByJWTFetchStarted = () => ({
  type: AUTH_BY_JWT_FETCH_STARTED
});

export const authByJWTFetchSuccess = (result) => ({
  type: AUTH_BY_JWT_FETCH_SUCCESS,
  result
});

export const authByJWTFetchFailure = (error) => ({
  type: AUTH_BY_JWT_FETCH_FAILURE,
  error
});


export const authByUserInfo = (username, password) => {
  return (dispatch) => {
    const authByUserInfoUrl = '/api/users/login';

    dispatch(authByUserInfoFetchStarted());

    axios.post(authByUserInfoUrl, {
      username,
      password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch(authByUserInfoFetchSuccess(res));
    })
    .catch(err => {
      dispatch(authByUserInfoFetchFailure(err));
    });
  }
};

export const authByUserInfoFetchStarted = () => ({
  type: AUTH_BY_USERINFO_FETCH_STARTED
});

export const authByUserInfoFetchSuccess = (result) => ({
  type: AUTH_BY_USERINFO_FETCH_SUCCESS,
  result
});

export const authByUserInfoFetchFailure = (error) => ({
  type: AUTH_BY_USERINFO_FETCH_FAILURE,
  error
});


export const toggleAuthMode = () => ({
  type: TOGGLE_AUTH_MODE
});


export const submitRegisterUserInfo = (username, password) => {
  return (dispatch) => {
    const submitRegisterUserInfoUrl = '/api/users';

    dispatch(submitRegisterUserInfoFetchStarted());

    axios.post(submitRegisterUserInfoUrl, {
      username,
      password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
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