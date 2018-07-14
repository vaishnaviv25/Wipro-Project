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
var header = {color: '#414288',fontSize: 20};


export class Errorr extends Component {
	login() {
		this.props.history.push('/home');
}
render() {
	return (
		<div style={container}>
			<div style={header}>
			</div>
            <center><h4>Invalid Customer ID or Password...</h4></center> 
			<div style={input3}>
				<div style={button} onClick={() => this.back()} >
					BACK
					</div>
			</div>
		</div>
	);
	}
}