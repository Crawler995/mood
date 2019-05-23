import React from 'react';

const NullContent = (props) => {
  return (
    <div className="py-4 text-center text-danger lead" style={{
      width: '100%'
    }}>
      { props.text }
    </div>
  )
}

export default NullContent;