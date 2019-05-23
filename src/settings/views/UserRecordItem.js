import React from 'react';

import './userRecordItem.css';

const UserRecordItem = (props) => {
  return (
    <div className="col-md-3 col-sm-6" style={{
      width: '100%',
      height: '200px',
      overflow: 'hidden'
    }}>
      <div className="slide-up rounded bg-danger text-white">
        <h4 className="p-4" style={{
          width: '100%',
          height: '120px',
          textAlign: 'left'
        }}>
          { props.title }
        </h4>
        <div className="p-4 lead" style={{
          width: '100%',
          height: '80px',
          textAlign: 'right'
        }}>
          { props.text }
        </div>
      </div>
    </div>
  )
}

export default UserRecordItem;