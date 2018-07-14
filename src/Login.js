import React, { Component } from 'react';

const container = { display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' };
const button = {
	backgroundColor: '#414288',
	color: '#ffffff',
	borderRadius: 100,
	padding: 10,
	paddingLeft: 20,
	paddingRight: 20,
	fontSize: 14,
	fontWeight: 'bold',
	cursor: 'pointer',
};
var header = { color: '#414288', fontSize: 20 };
const row = { display: 'flex', flexDirection: 'row', padding: 10 };
const title = { fontSize: 16, color: '#414288' };
const input1 = { fontSize: 16, color: '#414288', paddingLeft: 20 };
const input2 = { fontSize: 16, color: '#414288', paddingLeft: 38 };
const input3 = { paddingLeft: 80 };

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			password: "",

		}
		this.handleInputChange = this.handleInputChange.bind(this);

	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	login() {
		const url = 'http://localhost:8010/login';  // url  to send data to the backend for authentication
		let data = {
			"user": this.state.user,    // assign customer Id entered by the user
			"password": this.state.password    // assign password entered by the user
		}
		let fetchData = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}
		fetch(url, fetchData)     // function to fetch data from backend
			.then((resp) => resp.json()
				.then((data) => {
					console.log(data);
					console.log(this.props);
					if (data.status === "SUCCESS")  // If the entered data is correct, customer is navigated to home page
						this.props.history.push('/home?id=' + this.state.user);
					else
						alert("Invalid CustomerID or password !!!")  // alert message for incorrect data
				})
				.catch(function (error) {
					console.log(error);
				}));

	}
	render() {
		return (

			<div style={container}>
				<div style={header}>
				</div>

				<div style={row}>
					<div style={title}>
						Customer ID
				  </div>

					<div style={input1}>
						<input
							name="user"
							value={this.state.user}
							onChange={this.handleInputChange}
						/>
					</div>
				</div>

				<div style={row}>
					<div style={title}>
						Password
				  </div>

					<div style={input2}>
						<input
							name="password"
							type="password"
							value={this.state.password}
							onChange={this.handleInputChange} />
					</div>
				</div>

				<div style={input3}>
					<div style={button} type="submit" onClick={() => this.login()} >
						LOGIN
					</div>
				</div>
			</div>

		);
	}
}
