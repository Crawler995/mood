import * as actions from './actions';
import reducer from './reducer';
import PrivateRoute from './views/PrivateRoute';
import Login from './views/Login';
import defaultState from './defaultState';

const view = { PrivateRoute, Login };
export { 
  actions, 
  reducer, 
  view,
  defaultState
};