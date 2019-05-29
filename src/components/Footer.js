import React from 'react';

const Footer = (props) => {
  return (
    <section className="p-5 mt-3 bg-danger">
      <div className="container">
        <div className="lead text-center text-light">{ props.text }</div>
      </div>
    </section>
  )
}

export default Footer;