import {
    GET_USER_RECORD_FETCH_STARTED,
    GET_USER_RECORD_FETCH_SUCCESS,
    GET_USER_RECORD_FETCH_FAILURE
  } from './actionTypes';
  
  import axios from 'axios';
  
  export const getUserRecord = (username) => {
    return (dispatch) => {
      const getUserRecordUrl = `/api/users/${username}/record`;
  
      dispatch(getUserRecordFetchStarted());
  
      axios.get(getUserRecordUrl, {
        "headers": {
          'Authorization': 'jwt ' + localStorage.getItem('token')
        }
      })
      .then(res => {
        dispatch(getUserRecordFetchSuccess(res));
      })
      .catch(err => {
        dispatch(getUserRecordFetchFailure(err));
      });
    }
  }
  
  export const getUserRecordFetchStarted = () => ({
    type: GET_USER_RECORD_FETCH_STARTED
  });
  
  export const getUserRecordFetchSuccess = (result) => ({
    type: GET_USER_RECORD_FETCH_SUCCESS,
    result
  });
  
  export const getUserRecordFetchFailure = (error) => ({
    type: GET_USER_RECORD_FETCH_FAILURE,
    error
  });
  