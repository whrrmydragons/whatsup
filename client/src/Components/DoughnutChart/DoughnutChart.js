import React,{Fragment} from 'react';
let DoughnutChart = require("react-chartjs").Doughnut;

const doughnutChart = React.createClass({
    render: function() {
      return <DoughnutChart data={this.props.data} options={this.props.options}/>
    }
  });

export default DoughnutChart;