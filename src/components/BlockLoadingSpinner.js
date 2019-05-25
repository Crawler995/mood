import React from 'react';

const BlockLoadingSpinner = (props) => {
  return (
    <div className="py-4" style={{ textAlign: 'center', width: '100%' }}>
      <span className="spinner-border spinner-border-bg text-danger" role="status" aria-hidden="true"></span>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default BlockLoadingSpinner;