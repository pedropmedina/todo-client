import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AuthRoutes from '../routes/AuthRoutes';
import TaskRoutes from '../routes/TaskRoutes';

import PageNotFound from '../components/404';

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
	clientState: {
		defaults: {
			filter: 'all',
			dates: null,
			currentDate: Date.now(),
			toggleAllCompleted: false,
			openList: false,
		},
	},
});

const AppRouter = ({ history }) => (
	<Router history={history}>
		<Route
			render={({ location, match }) => (
				<ApolloProvider client={client}>
					<Switch>
						<Redirect from="/" to="/auth" exact />
						<Route path="/auth" component={AuthRoutes} />
						<Route path="/me" component={TaskRoutes} />
						<Route component={PageNotFound} />
					</Switch>
				</ApolloProvider>
			)}
		/>
	</Router>
);

export default hot(module)(AppRouter);
