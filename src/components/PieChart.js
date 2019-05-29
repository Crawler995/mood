import React from 'react';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';

export default class PieChart extends React.Component {
  pie = null;

  componentDidMount() {
    this.pie = echarts.init(document.getElementById(this.props.id));
    this.pie.showLoading();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLoading) {
      this.pie.showLoading();
    } else {
      this.pie.hideLoading();
    }

    this.setOption(nextProps.data);
  }

  setOption = (data) => {
    this.pie.setOption({
      series: [{
        name: '心情比例',
        type: 'pie',
        radius: '50%',
        data,
        roseType: 'radius',
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: '{b} {c}次\n{d}%'
            }
          }
        }
      }]
    });
  }

  render() {
    return (
      <div 
        id={this.props.id} 
        style={{width: '100%', height: this.props.height}}
      ></div>
    );
  }
}