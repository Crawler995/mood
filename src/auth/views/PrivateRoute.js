import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchStatus } from '../../utils/otherUtil';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FullScreenLoadingSpinner from '../../components/FullScreenLoadingSpinner';

import './privateRoute.css';

const PrivateRoute = ({component: Component, ...props}) => {
  const privatePage = (
    <div className="private-route">
      <Navbar />
      <Component />
      <Footer text="Developed By Zhang" />
    </div>
  )

  return (
    <Route {...props} render={(p) => {
      if(props.authStatus === fetchStatus.SUCCESS) {
        return privatePage;
      } else if (props.authStatus === fetchStatus.FAILURE) {
        return <Redirect to={{
          pathname: '/login',
          state: {
            from: p.location.pathname
          }
        }} />
      } else {
        return <FullScreenLoadingSpinner />;
      }
    }} />
  )
}


const mapStateToProps = state => {
  return {
    authStatus: state.userInfo.authStatus
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);