import React from 'react';
import { connect } from 'react-redux';

import UserRecordItem from './UserRecordItem';

const UserRecord = (props) => {
  const titles = ['你来到这已经', '你已经写下了', '你的心情有', '你最多的心情是'];

  const today = new Date();
  const registerDate = props.registerDate;
  const useDays = Math.round(
    (today - new Date(registerDate.year, registerDate.month - 1, registerDate.day)) / 86400000
  );
  const texts = [
    `${useDays}天`, 
    `${props.totalMoodNum}条心情`, 
    `${props.totalMoodNameNum}种`, 
    props.mostMoodName
  ];

  return (
    <div className="row">
      {
        titles.map((title, index) => 
          <UserRecordItem
            key={index}
            title={title}
            text={texts[index]}
            dir={index % 2 === 0 ? 'slide-up' : 'slide-down'}
            delay={0.5 + index * 0.2}
          />
        )
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    registerDate: state.userInfo.registerDate,
    totalMoodNum: 4,
    totalMoodNameNum: 5,
    mostMoodName: '悲伤'
  }
};

export default connect(mapStateToProps, null)(UserRecord);