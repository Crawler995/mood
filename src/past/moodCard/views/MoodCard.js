import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initMoodSelections, toggleSettings, submitSettings, changeMoodSelections } from '../actions';

import SectionTitle from '../../../components/SectionTitle';
import Card from './Card';
import DateRangePicker from '../../../components/DateRangePicker';
import SendRequestBtn from '../../../components/SendRequestBtn';
import NullContent from '../../../components/NullContent';
import BlockLoadingSpinner from '../../../components/BlockLoadingSpinner';

import { fetchStatus, getSendRequestBtnStatus } from '../../../utils/otherUtil';

class MoodCard extends React.Component {
  constructor(props) {
    super(props);

    this.props.initMoodSelections(this.props.moodNames);
  }

  getDefaultDate = () => {
    const date1 = new Date();
    const today = {
      year: date1.getFullYear(),
      month: date1.getMonth() + 1,
      day: date1.getDate()
    };

    const date2 = new Date(date1);
    date2.setDate(date1.getDate() - 5);
    const fiveDaysAgo = {
      year: date2.getFullYear(),
      month: date2.getMonth() + 1,
      day: date2.getDate()
    };

    return {fiveDaysAgo, today};
  }

  confirmFilter = () => {
    const { startDate, endDate } = this.refs.dateRange.state.dateRange;

    if(this.props.moodSelections === undefined) {
      return;
    }

    const selectedMoods = this.props.moodNames.filter((selection, index) => {
      return this.props.moodSelections[index]
    });

    this.props.submitSettings(startDate, endDate, selectedMoods, this.props.username);
  }

  componentDidMount() {
    const { startDate, endDate } = this.refs.dateRange.state.dateRange;

    const selectedMoods = this.props.moodNames;
    this.props.submitSettings(startDate, endDate, selectedMoods, this.props.username);
  }

  render() {
    const { fiveDaysAgo, today } = this.getDefaultDate();
    return (
      <React.Fragment>
        <SectionTitle text="你的心情卡片" />

        <center>
          <a
            href="#pastMoodCardFilter"
            className="btn btn-sm bg-danger text-light px-5 mb-3"
            data-toggle="collapse"
            onClick={this.props.toggleSettings}
          >
            { this.props.toggleBtnText }
          </a>
        </center>

        <div id="pastMoodCardFilter" className="collapse">
          <DateRangePicker 
            ref="dateRange"
            defaultStartDate={fiveDaysAgo}
            defaultEndDate={today} 
          />

          <p className="my-2">选择心情</p>
          
              {
                (
                  this.props.moodNames && this.props.moodNames.length !== 0 &&
                  <div className="custom-control custom-checkbox mt-3">
                    <div className="row">
                    {
                      this.props.moodNames.map((name, index) =>
                        <div className="col-sm-4 col-6" key={index}>
                          <div style={{ marginLeft: '40%' }}>
                            <input 
                              type="checkbox"
                              defaultChecked 
                              className="custom-control-input" 
                              id={'mood-filter-' + index}
                              onClick={this.props.changeMoodSelections.bind(this, index)}
                            />
                            <label className="custom-control-label" htmlFor={'mood-filter-' + index}>
                              {name}
                            </label>
                          </div>
                        </div>
                      )
                    }
                    </div>
                  </div>
                ) || <NullContent text="没有选择过的心情" />
              }
              
            

          <center>
            <SendRequestBtn
              className="btn btn-sm bg-danger text-light px-5 mb-3"
              clickHandle={this.confirmFilter.bind(this)}
              status={getSendRequestBtnStatus(this.props.submitSettingsStatus)}
              text="提交"
              successText="提交成功！"
              failureText="提交失败，请重试！"
            />
          </center>
        </div>

        <div className="mt-2 mb-1">{ this.props.moodDateRangeText }</div>
        
        <div className="row">
          {
            (
              this.props.moods && this.props.moods.length &&
              this.props.moods.map((item, index) =>
                <Card
                  key={index}
                  index={index}
                  mood={item.moodNames}
                  moodDescription={item.moodDescription}
                  date={item.date}
                />
              )
            ) || 
            (
              this.props.submitSettingsStatus === fetchStatus.LOADING 
              ? <BlockLoadingSpinner />
              : <NullContent text="没找到符合条件的心情" />
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    moodDateRangeText: state.moodCard.moodDateRangeText,
    toggleBtnText: state.moodCard.toggleBtnText,
    moodNames: [...new Set([...state.userInfo.usedMoodNames, ...state.nowMoodContent.usedMoodNames])],
    moodSelections: state.moodCard.moodSelections,
    moods: state.moodCard.moods,
    username: state.userInfo.username,
    submitSettingsStatus: state.moodCard.submitSettingsStatus
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  initMoodSelections,
  toggleSettings,
  submitSettings,
  changeMoodSelections
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoodCard);