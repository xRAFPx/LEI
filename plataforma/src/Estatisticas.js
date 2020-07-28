import React, {Component} from 'react';
import './App.css';
import { getFromStorage } from './Store/UserStore';
import axios from 'axios';
import {CanvasJSChart} from 'canvasjs-react-charts';

export default class Estatisticas extends Component{
  async componentWillMount(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const { token } = obj;
    await axios.get('http://localhost:5000/account/verifyAdmin?token='+ token)
        .then(res => {
          if(res.data.success){
            this.setState({
              token,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
            window.location = '/login'
          }
        })
    }else{
      this.setState({
        isLoading: false,
      });
      window.location = '/login'
    }
  }
  render(){
    const options = {
			animationEnabled: true,
			exportEnabled: false,
			theme: "light3", //"light1", "dark1", "dark2"
			title:{
				text: "Simple Column Chart with Index Labels"
      },
      axisY: {
				title: "Pedidos finalizados",
				includeZero: false
      },
      axisX: {
				title: "Dias do Mês",
				includeZero: false
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ label: "1º Semana", y: 71 },
					{ label: "2º Semana", y: 55 },
          { label: "3º Semana", y: 50 },
          { label: "4º Semana", y: 80 },
				]
			}]
		}
  return (
      <div className="App">
        <h1>Estatisticas</h1>
        <div>
          <CanvasJSChart options= {options}/>
        </div>
      </div>
    );
  }
}
