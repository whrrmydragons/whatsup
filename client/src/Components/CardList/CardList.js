import React,{Fragment,Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import * as Loading  from 'react-loading-animation';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
// import Status from '../Status/Status';
import Icon from '@material-ui/core/Icon';
import Status from '../Status/Status';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const DoughnutChart = require("react-chartjs").Doughnut;
const _ = require('lodash/core');

const printSamples = (samples)=>{
    return samples && _.map(samples,sample=>(
      <Card key={sample.name} style={{
      minWidth: 275,
       maxWidth: '300px',
       margin:'10px 10px',
       paddingLeft:'10px',
       paddingRight:'10px',
       paddingBottom:'0',
       display:'flex',
       justifyContent:"center"
    }}>
    <CardContent>
    <List component="nav">
        <ListItem button={false}>
          <ListItemIcon>
          <Status color="red"/>
          </ListItemIcon>
          <ListItemText primary={`${sample.name}`} inset={true} />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button={false}>
        {sample.pingDoughnut?<DoughnutChart data={sample.pingDoughnut}  />: <div><Loading/></div>}
        </ListItem>
        <ListItem button={false}>
        {sample.probeDoughnut?<DoughnutChart data={sample.probeDoughnut} />: <div><Loading/></div>}
        </ListItem>
        <ListItem button={false}>
        {sample.isAliveDoughnut?<DoughnutChart data={sample.isAliveDoughnut} />: <div><Loading/></div>}
        </ListItem>
      </List>

          

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

