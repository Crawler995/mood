import React from 'react';

import UserRecordItem from './UserRecordItem';

const UserRecord = (props) => {
  return (
    <div className="row">
      <UserRecordItem title="你来到这已经" text="3天" />
      <UserRecordItem title="你来到这已经" text="3天" />
      <UserRecordItem title="你来到这已经" text="3天" />
      <UserRecordItem title="你来到这已经" text="3天" />
    </div>
  )
}

export default UserRecord;