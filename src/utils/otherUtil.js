export const fetchStatus = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
  CONFLICT_FAILURE: 'conflict_failure'
};

export const getSendRequestBtnStatus = (status) => {
  if(status === undefined) {
    return 'none';
  } else if (status === fetchStatus.LOADING) {
    return 'loading';
  } else if (status === fetchStatus.SUCCESS) {
    return 'success';
  } else if (status === fetchStatus.FAILURE) {
    return 'failure';
  } else {
    return 'failure';
  }
}

export const getDateRangeText = (startDate, endDate) => {
  if(startDate.year === endDate.year && startDate.month === endDate.month && startDate.day === endDate.day) {
    return `${startDate.year}.${startDate.month}.${startDate.day}`;
  }
  return `${startDate.year}.${startDate.month}.${startDate.day} ~ ${endDate.year}.${endDate.month}.${endDate.day}`;
};