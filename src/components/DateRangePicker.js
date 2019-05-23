import React from 'react';

import DatePicker from './DatePicker';

export default class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateRange: {
        startDate: this.props.defaultStartDate,
        endDate: this.props.defaultEndDate
      }
    };
  }

  setStartDate = (startDate) => {
    this.setState({
      dateRange: {
        ...this.state.dateRange,
        startDate
      }
    });
  }

  setEndDate = (endDate) => {
    this.setState({
      dateRange: {
        ...this.state.dateRange,
        endDate
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6 pt-2">
          <label>开始日期</label>
          <DatePicker 
            ref="startDate" 
            dateChanged={this.setStartDate.bind(this)} 
            defaultDate={this.props.defaultStartDate}
          />
        </div>
        <div className="col-sm-6 pt-2">
          <label>截止日期</label>
          <DatePicker 
            ref="endDate" 
            dateChanged={this.setEndDate.bind(this)} 
            defaultDate={this.props.defaultEndDate}
          />
        </div>
      </div>
    );
  }
}
