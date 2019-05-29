import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authByUserInfo, submitRegisterUserInfo, toggleAuthMode } from '../actions';
import { authMode } from '../constants';
import { fetchStatus, getSendRequestBtnStatus } from '../../utils/otherUtil';

import SendRequestBtn from '../../components/SendRequestBtn';

class Login extends React.Component {
  loginHandle = () => {
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if(username === '' || password === '') {
      return;
    }
    
    if(this.props.authMode === authMode.LOGIN) {
      this.props.authByUserInfo(username, password);
    } else {
      this.props.submitRegisterUserInfo(username, password);
    }
    
  }

  render() {  
    if(this.props.authStatus === fetchStatus.SUCCESS) {
      let to = {
        pathname: (this.props.location.state && this.props.location.state.from.pathname) || '/now',
        state: {
          from: '/login'
        }
      };

      return <Redirect to={to} />
    }

    return (
      <div className="bg-danger" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%'
      }}>
        <div className="container px-5 py-5 mx-4 bg-white" style={{
          borderRadius: '1rem'
        }}>
          <div className="row">
            <div className="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
              <div className="text-center mb-5 display-4 text-danger">Mood</div>
              <label>用户名</label>
              <input
                type="text" 
                maxLength={10}
                required="required"
                className="form-control mb-2" 
                ref="username"
              />
              <label>密码</label>
              <input
                type="password" 
                maxLength={16}
                required="required"
                className="form-control" 
                ref="password"
              />

              <center>
                <div className="custom-control custom-switch mt-3">
                  <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="toggle-auth-mode" 
                    ref="toggleAuthMode"
                    onChange={this.props.toggleAuthMode.bind(this)} />
                  <label className="custom-control-label" htmlFor="toggle-auth-mode">
                    { this.props.authMode === authMode.LOGIN ? '点击切换注册' : '点击切换登录' }
                  </label>
                </div>
              </center>

              <center>
                <SendRequestBtn
                  className="btn bg-danger text-light mt-3"
                  clickHandle={this.loginHandle.bind(this)}
                  status={getSendRequestBtnStatus(this.props.authStatus)}
                  text={this.props.authMode === authMode.LOGIN ? '登录' : '注册'}
                  successText={this.props.authMode === authMode.LOGIN ? '登录成功' : '注册成功'}
                  failureText={this.props.authMode === authMode.LOGIN 
                               ? '登录失败，请重试' 
                               : (this.props.authStatus === fetchStatus.FAILURE
                                  ? '注册失败，请重试'
                                  : '用户名已存在！')}
                />
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.userInfo.authStatus,
    authMode: state.userInfo.authMode
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  authByUserInfo,
  submitRegisterUserInfo,
  toggleAuthMode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);