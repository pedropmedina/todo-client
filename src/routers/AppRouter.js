import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import { AnimatedSwitch } from 'react-router-transition';
import styled from 'styled-components';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

import AuthRoutes from '../routes/AuthRoutes';
import TaskRoutes from '../routes/TaskRoutes';

import Dashboard from '../components/Dashboard';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import Login from '../components/Login';
import Signup from '../components/Signup';

// transition css
// import '../../public/styles/index.css';

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
		defaults: { openTaskForm: false },
	},
});

const CSSTransitionGroup = styled(TransitionGroup)`
	height: 100vh;

	.fade-enter {
		opacity: 0;
		z-index: 1;
	}

	.fade-enter.fade-enter-active {
		opacity: 1;
		transition: opacity 250ms ease-in;
	}

	.fade-exit.fade-exit-active {
		opacity: 0;
	}
`;

const AppRouter = ({ history }) => (
	<Router>
		<Route
			render={({ location, match }) => (
				<ApolloProvider client={client}>
					<Switch>
						<Route
							exact
							path="/"
							render={() => <Redirect to="/auth/login" />}
						/>
						<Route path="/auth" component={AuthRoutes} />
						<Route path="/me" component={TaskRoutes} />
						{/* <Route render={() => <div>404 Page not found!!!</div>} /> */}
					</Switch>
				</ApolloProvider>
			)}
		/>
	</Router>
);

export default hot(module)(AppRouter);
