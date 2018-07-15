import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import socketIOClient from "socket.io-client";

const DoughnutChart = require("react-chartjs").Doughnut;
//import DoughnutChart from './Components/DoughnutChart/DoughnutChart';
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
    socket.on("update",data=>this.setState({response:data}))
  }
  render() {
    const { response } = this.state;
    console.log(response);
    let data = [
      {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Failed"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Succeeded"
      }
    ];
    return (
      <div className="App">
        <DoughnutChart data={data}/>
      </div>
    );
  }
}

export default App;
