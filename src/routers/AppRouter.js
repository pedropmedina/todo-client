import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import styled from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

import Dashboard from '../components/Dashboard';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import Login from '../components/Login';
import Signup from '../components/Signup';

// transition css
import '../../public/styles/index.css';

const client = new ApolloClient({
	// make requests to the api
	uri: 'http://localhost:5000/graphql',
	// set headers on each request
	request: operation => {
		const token = localStorage.getItem('authorization');
		return operation.setContext({
			headers: { authorization: token ? `Bearer ${token}` : '' },
		});
	},
});

const AppRouter = ({ history }) => (
	<Router history={history}>
		<ApolloProvider client={client}>
			<Route
				render={({ location }) => {
					console.log(location);
					return (
						<Switch>
							<Route exact path="/" render={() => <Redirect to="/login" />} />
							<PublicRouter path="/login" component={Login} />
							<PublicRouter path="/signup" component={Signup} />
							<PrivateRouter path="/dashboard" component={Dashboard} />
							<PrivateRouter path="/add" component={AddTask} />
							<PrivateRouter path="/edit/:id" component={EditTask} />
							<PublicRouter render={() => <div>404 Page not found!!!</div>} />
						</Switch>
					);
				}}
			/>
		</ApolloProvider>
	</Router>
);

export default hot(module)(AppRouter);
