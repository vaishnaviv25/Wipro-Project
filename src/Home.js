import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import { Prepaid } from './Prepaid';
import { Postpaid } from './Postpaid';
import { Internet } from './Internet';
import { Landline } from './Landline';
import queryString from 'query-string';

const container = { display: 'flex', height: '100vh', flexDirection: 'column', padding: 50 };
const row = { display: 'flex', flexDirection: 'row', padding: 10 };
const menu = {};
const menuItem = { paddingBottom: 10, textTransform: 'uppercase' };
const content = { paddingLeft: 30, };

export class Home extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			// define the default state here
		};
	}
	render() {
		let params = queryString.parse(this.props.location.search);
		this.parameter = params;
		
		return (
			<div style={container}>
				<h2>WELCOME</h2>
				<div style={row}>
					<div style={menu}>
						<div style={menuItem}><Link to={`${this.props.match.url}/prepaid?id=${this.parameter.id}`}>Prepaid</Link></div>
						<div style={menuItem}><Link to={`${this.props.match.url}/postpaid?id=${this.parameter.id}`}>Postpaid</Link></div>
						<div style={menuItem}><Link to={`${this.props.match.url}/internet?id=${this.parameter.id}`}>Internet</Link></div>
						<div style={menuItem}><Link to={`${this.props.match.url}/landline?id=${this.parameter.id}`}>Landline</Link></div>
					</div>
					<div style={content}>
						<Route path={`${this.props.match.url}/prepaid`} component={Prepaid} />
						<Route path={`${this.props.match.url}/postpaid`} component={Postpaid} />
						<Route path={`${this.props.match.url}/internet`} component={Internet} />
						<Route path={`${this.props.match.url}/landline`} component={Landline} />
					</div>
				</div>

			</div>
		);
	}
}
