import {
  TOGGLE_SETTINGS,
  SUBMIT_SETTINGS_FETCH_STARTED,
  SUBMIT_SETTINGS_FETCH_SUCCESS,
  SUBMIT_SETTINGS_FETCH_FAILURE
} from './actionTypes';

import axios from 'axios';
import { getDateRangeText } from '../../utils/otherUtil';

export const toggleSettings = () => ({
  type: TOGGLE_SETTINGS
});

export const submitSettings = (startDate, endDate, username) => {
  return (dispatch) => {
    const submitSettingsUrl = `/users/${username}/moods/data`;

    dispatch(submitSettingsStarted());

    axios.get(submitSettingsUrl, {
      "params": {
        start: `${startDate.year}/${startDate.month}/${startDate.day}`,
        end: `${endDate.year}/${endDate.month}/${endDate.day}`
      },
      "headers": {
        'Authorization': 'jwt ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      dispatch(submitSettingsSuccess(res, getDateRangeText(startDate, endDate)));
    })
    .catch(err => {
      dispatch(submitSettingsFailure(err));
    });
  }
};

export const submitSettingsStarted = () => ({
  type: SUBMIT_SETTINGS_FETCH_STARTED
});

export const submitSettingsSuccess = (result, moodDateRangeText) => ({
  type: SUBMIT_SETTINGS_FETCH_SUCCESS,
  result,
  moodDateRangeText
});

export const submitSettingsFailure = (error) => ({
  type: SUBMIT_SETTINGS_FETCH_FAILURE,
  error
})