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

export class Postpaid extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			Bill: 500,
			Today_calls: 400,
			Today_sms: 50,
			Today_data: 2,
			Monthly_calls: [15, 19, 10, 11],
			Monthly_sms: [58, 18, 10, 11],
			Monthly_data: [50, 48, 10, 19]
		}
	}
	componentDidMount() {
		const url = 'http://localhost:8010/home/postpaid';
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
					Bill: resp.bill,
					Today_calls: resp.Today_view.calls,
					Today_sms: resp.Today_view.sms,
					Today_data: resp.Today_view.data,
					Monthly_calls: resp.Monthly_view.calls,
					Monthly_sms: resp.Monthly_view.sms,
					Monthly_data: resp.Monthly_view.data
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
					data: this.state.Monthly_calls
				},
				{
					label: "SMS",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "blue",
					data: this.state.Monthly_sms
				},
				{
					label: "Data",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "green",
					data: this.state.Monthly_data
				}
			]
		};

		var chartOptions = {
			scaleFontFamily: 'PT Sans',
			scaleFontSize: 14,
		};

		return (
			<div>
					<div style={container}>
						<div style={H1}>POSTPAID</div>
						<div style={{ paddingTop: 15 }} />
						<div style={row}>
							<div style={H2}>Outstanding Bill</div>
							<div style={row}>
								<div>{this.state.Bill} INR</div>

							</div>
						</div>
						<div style={{ paddingTop: 15 }} />
						<div style={H2}>Today's View</div>
						<div style={{ paddingTop: 5 }} />
						<div style={row}>
							<div style={col}>
								<div style={H3}>Calls</div>
								<div style={Text}>{this.state.Today_calls} Min</div>
							</div>
							<div style={col}>
								<div style={H3}>SMS</div>
								<div style={Text}>{this.state.Today_sms}</div>
							</div>
							<div style={col}>
								<div style={H3}>Data</div>
								<div style={Text}>{this.state.Today_data} GB</div>
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
