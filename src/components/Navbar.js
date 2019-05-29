import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <span className="navbar-brand">Mood</span>
        <span className="navbar-text">你的喜怒哀乐。</span>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse collapsibleNavbar justify-content-end"> 
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/past">过去</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/now'>现在</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/future">未来</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/settings">{ this.props.username }</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userInfo.username
  }
};

export default connect(mapStateToProps, null)(Navbar);