import React, { Component } from 'react';
import queryString from 'query-string';

const container = { display: 'flex', height: '100vh', flexDirection: 'column', width: '500px', paddingLeft: 50 };
const row = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' };
const col = { display: 'flex', flexDirection: 'column', };


const H1 = { fontSize: 16, fontWeight: 'bold', backgroundColor: '#414288', color: '#ffffff', padding: 5 };
const H2 = { fontSize: 15, fontWeight: 'bold' };
const H3 = { fontSize: 14, fontWeight: 'bold' };
const Text = { fontSize: 13 };

var LineChart = require("react-chartjs").Line;

export class Landline extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			status: 0,
			bill: 1000,
			calls: 50,
			data_calls: [65, 59, 80, 81]
		};
	}
	componentDidMount() {
		const url = 'http://localhost:8010/home/landline';
		let params = queryString.parse(this.props.location.search);
		
		let data= {
			"user": params.id
		}
		
		let fetchData = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}
		fetch(url, fetchData)
			.then((resp) => resp.json())
			.then((resp) => {
				this.setState({
					bill: resp.bill,
					calls: resp.Today_view.calls,
					data_calls: resp.Monthly_view.calls
				})
				console.log(resp);

			})
			.catch(function (error) {
				console.log(error);
			});
	}
	render() {
		
		let chartData = {
			labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4'],
			datasets: [
				{
					label: "Calls",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "red",
					data: this.state.data_calls
				},

			]
		};
		var chartOptions = {
			scaleFontFamily: 'PT Sans',
			scaleFontSize: 14,
		};

		return (
			<div>
					<div style={container}>
						<div style={H1}>LANDLINE</div>

						<div style={{ paddingTop: 15 }} />
						<div style={row}>
							<div style={H2}>Outstanding Bill</div>
							<div style={row}>
								<div>{this.state.bill} INR</div>

							</div>
						</div>
						<div style={{ paddingTop: 15 }} />
						<div style={H2}>Today's View</div>
						<div style={{ paddingTop: 5 }} />
						<div style={row}>
							<div style={col}>
								<div style={H3}>Calls</div>
								<div style={Text}>{this.state.calls} Min</div>
							</div>

						</div>

						<div style={{ paddingTop: 15 }} />
						<div style={H2}>Monthly View</div>
						<div style={{ padding: 10, }}>
							<LineChart data={chartData} options={chartOptions} width="500" height="250" />
						</div>
					</div>
			</div>
		);
	}
}
