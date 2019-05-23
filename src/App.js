import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as authActions } from './auth'

import { view as Auth } from './auth';
import { view as Now } from './now';
import { view as Past } from './past';
import { view as Future } from './future'
import { view as Settings } from './settings';

const { PrivateRoute, Login } = Auth;
const { authByJWT } = authActions;


class App extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.pathname === '/') {
      this.props.history.push('/now');
    }

    if(this.props.location.pathname !== '/login') {
      this.props.authByJWT();
    }
  }

  render() {
    return (
        <React.Fragment>
          <Switch>
            <PrivateRoute exact path="/past" component={Past} />
            <PrivateRoute exact path="/now" component={Now} />
            <PrivateRoute exact path="/future" component={Future} />
            <PrivateRoute exact path="/settings" component={Settings} />

            <Route exact path="/login" component={Login} />
          </Switch>
        </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authByJWT
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(App));
