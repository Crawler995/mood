import React from 'react';

const FullScreenLoadingSpinner = (props) => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      paddingTop: '30vh'
    }}>
      <div style={{
        width: '100%',
        height: '30vh',
        textAlign: 'center'
      }}>
        <span 
          className="spinner-grow text-danger" 
          role="status" 
          aria-hidden="true"
          style={{
            width: '10em',
            height: '10em'
          }}>
        </span>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="lead text-center text-danger">Loading...</div>
    </div>
  )
}

export default FullScreenLoadingSpinner;