import React, { Component } from 'react';


import socketIOClient from "socket.io-client";
import CardList from './Components/CardList/CardList';
import AppBar from './Components/AppBar/AppBar';
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#68b36b',
      main: '#43a047',
      dark: '#2e7031',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4aedc4',
      main: '#1de9b6',
      dark: '#14a37f',
      contrastText: '#000',
    },
  },
});
const _ = require('lodash/core');

const DoughnutChart = require("react-chartjs").Doughnut;


//import DoughnutChart from './Components/DoughnutChart/DoughnutChart';

const failSuccessToDoughnut = (data)=>[ {
  value: data.fail||0,
  color:"#F7464A",
  highlight: "#FF5A5E",
  label: "Fail"
},
{
  value: data.success||0,
  color: "#46BFBD",
  highlight: "#5AD3D1",
  label: "Success"
}];


const socketToChartData = data =>_.map(data,(sample,key)=>{
  //console.log(sample);
  return {
  name:key,
  pingDoughnut:failSuccessToDoughnut(sample.pingTest),
  probeDoughnut:failSuccessToDoughnut(sample.probeTest),
  isAliveDoughnut:failSuccessToDoughnut(sample.isAliveTest),

  }
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      response:"",
      endpoint:"http://localhost:3001",
    }
  }
  componentDidMount(){
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("update",data=>this.setState({response:socketToChartData(data)}))
  }
  render() {
    let { response } = this.state;

    console.log(response);
 
    return ( <MuiThemeProvider theme={theme}>
      <AppBar/>
      <CardList samples={response}/>
    </MuiThemeProvider>);
  }
}

export default App;
