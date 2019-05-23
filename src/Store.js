import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as authReducer, defaultState as initialUserInfo } from './auth';
import { reducer as nowReducer, defaultState as initialMoodContent } from './now';
import { reducer as moodDataReducer, defaultState as initialMoodData } from './past/moodData';
import { reducer as moodCardReducer, defaultState as initialMoodCard } from './past/moodCard';

const reducer = combineReducers({
  userInfo: authReducer,
  nowMoodContent: nowReducer,
  moodData: moodDataReducer,
  moodCard: moodCardReducer
});

const initialState = {
  userInfo: initialUserInfo,
  nowMoodContent: initialMoodContent,
  moodData: initialMoodData,
  moodCard: initialMoodCard
};

const middlewares = [thunkMiddleware];
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (window && window.__REDUX_DEVTOOLS_EXTENSION__)
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f
);

export default createStore(reducer, initialState, storeEnhancers);