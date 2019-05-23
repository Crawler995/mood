import React from 'react';

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.defaultDate
    };
  }

  componentDidMount() {
    this.setInputRange();
  }

  isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  computeDayNum = (year, month) => {
    if(month === 2) {
      return this.isLeapYear(year) ? 29 : 28;
    }

    const day30 = [4, 6, 9, 11];
    return day30.indexOf(month) !== -1 ? 30 : 31;
  }

  isCurMonth = (now) => {
    return now.getFullYear() === this.state.date.year && 
           now.getMonth() + 1 === this.state.date.month;
  }

  setInputRange = () => {
    const { yearInput, monthInput, dayInput } = this.refs;
    const now = new Date();
    const maxDay = this.computeDayNum(this.state.date.year, this.state.date.month);

    yearInput.max = now.getFullYear();
    monthInput.max = now.getFullYear() === this.state.date.year ? now.getMonth() + 1 : 12;
    
    if(maxDay < dayInput.value) {
      this.setState({
        date: {...this.state.date, day: maxDay}
      }, () => {
        this.props.dateChanged({ ...this.state.date });
      });
      
    }
    if(this.isCurMonth(now) && dayInput.value > now.getDate()) {
      this.setState({
        date: {...this.state.date, day: now.getDate()}
      }, () => {
        this.props.dateChanged({ ...this.state.date });
      });
    }

    dayInput.max = this.isCurMonth(now) ? now.getDate() : maxDay;
  }

  dateChangedHandle = (e, target) => {
    const change = {};
    change[target] = +e.target.value;

    const newDate = {...this.state.date, ...change};

    this.setState({
      date: newDate
    }, () => {
      this.props.dateChanged(newDate);
      this.setInputRange();
    });
  }

  render() {
    const style = {
      border: '1px solid #dc3545',
      borderRadius: '.25rem'
    };

    const { year, month, day } = this.state.date;

    return (
      <div className="container">
        <div className="row p-1" style={style}>
          <div className="col-4">
            <label>{ year + '年' }</label>
            <input 
              type="range" 
              className="custom-range"
              ref="yearInput"
              value={year}
              min={2019}
              onChange={(e) => this.dateChangedHandle(e, 'year')}
            />
          </div>
          <div className="col-4">
            <label>{ month + '月' }</label>
            <input 
              type="range" 
              className="custom-range"
              ref="monthInput"
              value={month}
              min={1}
              onChange={(e) => this.dateChangedHandle(e, 'month')}
            />
          </div>
          <div className="col-4">
            <label>{ day + '日' }</label>
            <input 
              type="range" 
              className="custom-range"
              ref="dayInput"
              value={day}
              min={1}
              onChange={(e) => this.dateChangedHandle(e, 'day')}
            />
          </div>
        </div>
      </div>
    );
  }
}
