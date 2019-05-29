import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUserRecord } from '../actions';

import UserRecordItem from './UserRecordItem';
import BlockLoadingSpinner from '../../../components/BlockLoadingSpinner';

class UserRecord extends React.Component {
  constructor(props) {
    super(props);

    this.titles = ['你来到这已经', '你已经写下了', '你的心情有', '你最多的心情是'];

    const today = new Date();
    const registerDate = props.registerDate;
    this.useDays = Math.round(
      (today - new Date(registerDate.year, registerDate.month - 1, registerDate.day)) / 86400000
    );
  }

  componentDidMount() {
    this.props.getUserRecord(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    this.texts = [
      `${this.useDays}天`, 
      `${nextProps.totalMoodNum}条心情`, 
      `${nextProps.totalMoodNameNum}种`, 
      nextProps.mostMoodName.join(' ')
    ];
  }

  render() {
    return (
      <div className="row">
        {
          (
            this.texts &&
            this.titles.map((title, index) => 
              <UserRecordItem
                key={index}
                title={title}
                text={this.texts[index]}
                dir={index % 2 === 0 ? 'slide-up' : 'slide-down'}
                delay={0.2 + index * 0.2}
              />
            )
          ) || <BlockLoadingSpinner />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userInfo.username,
    registerDate: state.userInfo.registerDate,
    totalMoodNum: state.userRecord.totalMoodNum,
    totalMoodNameNum: state.userRecord.totalMoodNameNum,
    mostMoodName: state.userRecord.mostMoodName
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserRecord
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecord);