import React from 'react';

const SectionTitle = (props) => {
  return (
    <h3 className="pb-3 mb-3" style={{
      borderBottom: "1px solid #dc3545"
    }}>
      { props.text }
    </h3>
  )
}

export default SectionTitle;