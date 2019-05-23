import React from 'react';

const Header = (props) => {
  return (
    <section className="p-5 mb-3 bg-danger">
      <div className="container">
        <h2 className="text-white text-center mb-3">{ props.title }</h2>
        <p className="lead text-center text-light">{ props.lead }</p>
      </div>
    </section>
  )
}

export default Header;