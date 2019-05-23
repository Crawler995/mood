import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initMood, selectMoodBtnClicked, addMoodBtn, submitMoodContent } from '../actions';

import Header from '../../components/Header';
import SectionTitle from '../../components/SectionTitle';

import SelectMoodBtn from './SelectMoodBtn';
import SendRequestBtn from '../../components/SendRequestBtn';

import { getSendRequestBtnStatus } from '../../utils/otherUtil';

class Now extends React.Component {
  constructor(props) {
    super(props);
    this.props.initMood(this.props.defaultMoodNames);
  }

  getCustomizeMoodNameAndAddMoodBtn = () => {
    const customizeMood = this.refs.customizeMood;
    const customizeMoodName = customizeMood.value;
    if(!customizeMoodName.trim()) {
      return;
    }

    this.props.addMoodBtn(customizeMoodName);

    customizeMood.value = '';
  }

  getMoodDescriptionAndSubmitMoodContent = () => {
    const moodDescription = this.refs.moodDescription;
    const selectMoods = this.props.moodNames.filter((name, index) => {
      return this.props.moodSelections[index]
    });

    if(selectMoods.length === 0) {
      return;
    }
    
    this.props.submitMoodContent(this.props.username, selectMoods, moodDescription);
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="现在"
          lead="用一点点时间，记录一下你的心情吧。"
        />

        <div>
          <div className="container py-5 px-4">
            <SectionTitle text="今天的心情" />

            <p className="mt-5">点击下方按钮进行选择（可多选）</p>
            <div className="row">
              {
                this.props.moodNames &&
                this.props.moodNames.map((moodName, index) => 
                  <SelectMoodBtn
                    key={index} 
                    text={moodName}
                    isSelected={this.props.moodSelections[index]}
                    clickHandle={this.props.selectMoodBtnClicked.bind(this, index)} 
                  />
                )
              }
            </div>

            <p className="mt-5">添加自定义心情</p>
            <div className="row">
              <div className="col-sm-6 pb-2">
                <input 
                  className="pl-2 form-control"
                  type="text" 
                  ref="customizeMood" 
                  placeholder="你的心情"
                  style={{
                    display: 'inline-block',
                    width: '80%',
                    marginLeft: '10%'
                  }} 
                />
              </div>
              <div className="col-sm-6 pb-2">
                <button 
                  className="add-mood-btn btn bg-danger text-light"
                  style={{
                    display: 'inline-block',
                    width: '40%',
                    marginLeft: '30%'
                  }}
                  onClick={this.getCustomizeMoodNameAndAddMoodBtn.bind(this)}
                >添加</button>
              </div>
            </div>

            <p className="mt-5">还可以用文字描述一下（可选）</p>
            <textarea 
              className="form-control" 
              rows="4" 
              ref="moodDescription"
              placeholder="写一下吧"
            ></textarea>

            <center>
              <SendRequestBtn 
                className="btn bg-danger text-light mb-5 px-5"
                clickHandle={this.getMoodDescriptionAndSubmitMoodContent.bind(this)}
                status={getSendRequestBtnStatus(this.props.submitMoodContentStatus)}
                text="提交"
                successText="提交成功！"
                failureText="提交失败，请重试！"
              />
            </center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userInfo.username,
    defaultMoodNames: state.nowMoodContent.moodNames || state.userInfo.defaultMoodNames,
    moodNames: state.nowMoodContent.moodNames,
    moodSelections: state.nowMoodContent.moodSelections,
    submitMoodContentStatus: state.nowMoodContent.submitMoodContentStatus
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  initMood,
  selectMoodBtnClicked,
  addMoodBtn,
  submitMoodContent
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Now);