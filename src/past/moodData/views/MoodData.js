import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleSettings, submitSettings } from '../actions';

import SectionTitle from '../../../components/SectionTitle';
import DateRangePicker from '../../../components/DateRangePicker';
import PieChart from '../../../components/PieChart';
import SendRequestBtn from '../../../components/SendRequestBtn';

import { fetchStatus, getSendRequestBtnStatus } from '../../../utils/otherUtil';

class MoodData extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();

    this.defaultStartDate = this.props.registerDate;
    this.defaultEndDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  submitSettingsHandle = () => {
    const { startDate, endDate } = this.refs.dateRange.state.dateRange;
    this.props.submitSettings(startDate, endDate, this.props.username);
  }

  componentDidMount() {
    this.submitSettingsHandle();
  }

  render() {
    return (
      <React.Fragment>
        <SectionTitle text="你的心情总览" />

        <center>
          <a
            href="#pastMoodData"
            className="btn btn-sm bg-danger text-light px-5 mb-3"
            data-toggle="collapse"
            onClick={this.props.toggleSettings}
          >
            { this.props.toggleBtnText }
          </a>
        </center>

        <div id="pastMoodData" className="collapse">
          <DateRangePicker 
            ref="dateRange"
            defaultStartDate={this.defaultStartDate}
            defaultEndDate={this.defaultEndDate} 
          />

          <center>
            <SendRequestBtn
              className="btn btn-sm bg-danger text-light px-5"
              clickHandle={this.submitSettingsHandle.bind(this)}
              status={getSendRequestBtnStatus(this.props.submitSettingsStatus)}
              text="提交"
              successText="提交成功！"
              failureText="提交失败，请重试！"
            />
          </center>
        </div>

        <div className="mt-2 mb-1">{ this.props.moodDateRangeText }</div>

        {
          (
            this.props.submitSettingsStatus === fetchStatus.SUCCESS && !this.props.moodNum.length &&
            <div className="text-danger" style={{
              height: '400px',
              lineHeight: '400px',
              textAlign: 'center'
            }}>此时间段内无心情数据</div>
          )
          ||
          <PieChart
            id="past-mood-proportion-pie"
            height="400px"
            data={this.props.moodNum}
            isLoading={this.props.submitSettingsStatus === fetchStatus.LOADING}
          />
        }
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    toggleBtnText: state.moodData.toggleBtnText,
    moodNum: state.moodData.moodNum,
    registerDate: state.userInfo.registerDate,
    submitSettingsStatus: state.moodData.submitSettingsStatus,
    username: state.userInfo.username,
    moodDateRangeText: state.moodData.moodDateRangeText
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSettings,
  submitSettings
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoodData);