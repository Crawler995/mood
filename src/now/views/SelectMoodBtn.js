import React from 'react';

const SelectMoodBtn = (props) => {
  return (
    <div className="p-2 col-sm-6 col-md-4">
      <button
        className="btn bg-danger text-light"
        style={{
          display: 'block',
          position: 'relative',
          width: '80%',
          marginLeft: '10%'
        }}
        onClick={props.clickHandle}
      >
        { props.text }
        <span
          className="text-light" 
          style={{
            position: 'absolute',
            right: '10%',
            opacity: props.isSelected ? 1 : 0
          }}
        >√</span>
      </button>
    </div>
  )
}

export default SelectMoodBtn;