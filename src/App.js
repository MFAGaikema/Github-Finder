import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	state = {
    users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	};

	searchUsers = async (text) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}
			&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ users: res.data.items, loading: false });
  };
  
  getUsersRepos = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}
			/repos?per_page=5&sort=created:asc
			&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ repos: res.data, loading: false });
	};

	getUser = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}
			?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ user: res.data, loading: false });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => {
			this.setState({ alert: null });
		}, 4000);
	};

	render() {
		const { users, loading, alert, user, repos } = this.state;

		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											users={this.state.users}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
              />
              <Route path="/about" component={About}/>
              <Route path='/users/:login' render={props => (
								<User 
									{...props} 
									getUser={this.getUser} 
									getUsersRepos={this.getUsersRepos}
									user={user} 
									repos={repos}
									loading={loading}/>
              )}/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
