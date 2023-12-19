import React, { Component } from 'react';
import './App.css';
import CanvasJSReact from '@canvasjs/react-charts';

//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];

class SteamUpdateChart extends Component {
	
	render() {
		const {points} = this.props;
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark1", // "light1", "dark1", "dark2"
			title:{
				text: "Last 30 news"
			},
			axisY: {
				title: "Period",
				suffix: "day(s)"
			},
			axisX: {
				title: "News",
				prefix: "",
				interval: 1
			},
			
			data: [{
				type: "line",
				toolTipContent: "Title: {title}<br/> Release Date: {date}",
				click: function (e) {
                    if (e.dataPoint && e.dataPoint.url) {
                        window.open(e.dataPoint.url, '_blank', 'noopener,noreferrer');
                    }
                },
				dataPoints: points
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			<p className='text-white'>**click each point to get open news</p>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default SteamUpdateChart;