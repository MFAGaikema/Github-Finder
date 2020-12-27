import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
	state = {
		text: '',
	};

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		users: PropTypes.array.isRequired,
		setAlert: PropTypes.func.isRequired,
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.text === '') {
			this.props.setAlert('Please enter something', 'light');
		} else {
			this.props.searchUsers(this.state.text);
			this.setState({ text: '' });
		}
	};

	render() {
		const { users, clearUsers } = this.props;
		return (
			<div>
				<form className='from' onSubmit={this.onSubmit}>
					<input
						type='text'
						name='text'
						placeholder='Search User...'
						value={this.state.text}
						onChange={this.handleChange}
					/>
					<input type='submit' value='Search' className='btn btn-dark btn-block' />
				</form>
				{users.length > 0 && (
					<button className='btn btn-light btn-block' onClick={clearUsers}>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default Search;
