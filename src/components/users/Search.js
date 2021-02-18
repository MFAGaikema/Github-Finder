import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const { searchUsers } = githubContext;
	const { setAlert } = alertContext;

	const [text, setText] = useState('');

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		} else {
			searchUsers(text);
			setText('');
		}
	};

	return (
		<div>
			<form className='from' onSubmit={onSubmit}>
				<input type='text' name='text' placeholder='Search User...' value={text} onChange={handleChange} />
				<input type='submit' value='Search' className='btn btn-dark btn-block' />
			</form>
			{githubContext.users.length > 0 && (
				<button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
