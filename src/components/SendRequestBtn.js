import React from 'react';

const loadingSpinner = 
<React.Fragment>
  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span className="sr-only">Loading...</span>
</React.Fragment>;

class SendRequestBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.text
    };
  }

  componentWillReceiveProps(nextProps) {
    const nowStatus = this.props.status;
    const nextStatus = nextProps.status;

    if(nextStatus === 'loading') {
      this.setState({ content: loadingSpinner });
    } else if (nowStatus === 'loading') {
      if(nextStatus === 'success') {
        this.setState({ content: this.props.successText }, () => {
          this.timer1 = setTimeout(() => {
            this.setState({ content: this.props.text });
          }, 1000);
        });
      } else if (nextStatus === 'failure') {
        this.setState({ content: this.props.failureText }, () => {
          this.timer2 = setTimeout(() => {
            this.setState({ content: this.props.text });
          }, 1000);
        });
      }
    }

    if(nextProps.text !== this.props.text) {
      this.setState({ content: nextProps.text });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-danger mt-3" style={{
          opacity: this.state.content === this.props.text ? 0 : 1
        }}>
          { this.state.content }
        </div>
        <button
          className={`${this.props.className} mt-2`}
          onClick={this.props.clickHandle}
          disabled={this.props.status === 'loading'}
        >
          {
            this.props.text
          }
        </button>
      </React.Fragment>
    )
  }
}

export default SendRequestBtn;