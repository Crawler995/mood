import React from 'react';
import './card.css';

class Card extends React.Component {
  addAnimation = () => {
    const rect = this.card.getBoundingClientRect();
    if(rect.top > this.windowHeight + this.card.style.height) {
      if(this.card.classList.contains('card-appear')) {
        this.card.classList.remove('card-appear');
      }
    } else {
      if(!this.card.classList.contains('card-appear')) {
        this.card.classList.add('card-appear');
      }
    }
  };

  componentDidMount() {
    this.card = document.getElementsByClassName('card')[this.props.index];
    this.windowHeight = window.innerHeight;

    window.addEventListener('scroll', this.addAnimation);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.addAnimation);
  }

  render() {
    return (
      <div className="col-md-6 my-3">
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="card bg-danger text-white" style={{
            opacity: 0,
            transform: 'translate3d(0, 30px, 0)',
            width: '100%'
          }}>
            <div className="card-header">
              {
                this.props.mood.map((item, index) => 
                  <h5 key={index} className="mr-2" style={{
                    marginBottom: '0px', display: 'inline-block'
                  }}>{ item }</h5>
                )
              }
            </div>
            {
              this.props.moodDescription === '' ? <div></div> :
              <div className="card-body">{ this.props.moodDescription }</div>
            }
            <div className="card-footer text-right">
              { this.props.date.substring(0, 10) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;