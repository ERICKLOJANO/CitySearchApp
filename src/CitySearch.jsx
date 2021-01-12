import axios from 'axios';
import React, { Component } from 'react';
class CitySearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
      CityName: 'SPRINGFIELD',
      Zipcodes: ''
		};
		this.searchCityName = this.searchCityName.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		this.searchCityName();
	}
	searchCityName(event) {
		if (event != null) event.preventDefault();
		axios
			.get(`http://ctp-zip-api.herokuapp.com/city/${this.state.CityName}`)
			.then((response) => {
				this.setState({
					Zipcodes: response.data  + ','
				 });
				console.log(response)
			})
			.catch((error) => {
				this.setState({ Zipcodes: 'No results' });
			});
	}
	handleChange(event) {
		this.setState({ CityName: event.target.value });
	}
	render() {
		return (
			<div>
				<div id = "titleContainer">
				<h1 id = "mainTitle">City Name Search</h1>
				</div>
				<form onSubmit={this.searchCityName}>
					<div id = "userInput">
					<label>
						Enter ZipCode:
						<input type="text" value={this.state.CityName} onChange={this.handleChange}></input>
					</label>
						<input type="submit" value="Submit"></input>
					</div>
				</form>
				<p>Zip Codes in {this.state.CityName}:</p>
        <p>{this.state.Zipcodes}</p>
			</div>
		);
	}
}
export default CitySearch;
