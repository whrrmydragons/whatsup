import React,{Fragment,Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import * as Loading  from 'react-loading-animation';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
// import Status from '../Status/Status';
import Icon from '@material-ui/core/Icon';
import CheckCircle from '@material-ui/icons/Lens';


const DoughnutChart = require("react-chartjs").Doughnut;
const _ = require('lodash/core');

const printSamples = (samples)=>{
    return samples && _.map(samples,sample=>(
      <Card key={sample.name} style={{
      minWidth: 275,
       maxWidth: '300px',
       margin:'10px 10px',
       display:'flex',
       justifyContent:"center"
    }}>
    <CardContent>
            <Icon color="error">
                <CheckCircle/>
            </Icon>
          <span>Name: {sample.name}</span>
          <Divider/>
          {sample.pingDoughnut?<DoughnutChart data={sample.pingDoughnut}  />: <div><Loading/></div>}
          {sample.probeDoughnut?<DoughnutChart data={sample.probeDoughnut} />: <div><Loading/></div>}
          {sample.isAliveDoughnut?<DoughnutChart data={sample.isAliveDoughnut} />: <div><Loading/></div>}
          <Divider/>

    </CardContent>
    </Card>
  ))
}



class CardList extends Component {
    render() {
      let { samples } = this.props.samples;
      let sampleList = printSamples(samples);
   
      return (<div style={{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between'
      }}>
      { printSamples(this.props.samples)}
      </div>);
    }
  }

  export default CardList;

