import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

import filterRoutes from '../helpers/filterRoutes';

import PublicRouter from '../routers/PublicRouter';

import Login from '../components/Login';
import Signup from '../components/Signup';
import PageNotFound from '../components/404';

export const matches = [
	{
		path: '/auth',
		exact: true,
		component: () => <Redirect to="/auth/login" />,
	},
	{
		path: '/auth/login',
		exact: true,
		component: Login,
	},
	{
		path: '/auth/signup',
		exact: true,
		component: Signup,
	},
];

const config = {
	enter: {
		opacity: 1,
		transition: { opacity: { ease: 'easeIn', duration: 1000 } },
	},
	exit: {
		opacity: 0,
		transition: { opacity: { ease: 'easeOut', duration: 1000 } },
	},
};

const RouteContainer = posed.div(config);

export default ({ location, match }) => {
	const matched = matches
		.filter(filterRoutes(location.pathname))
		.map(({ path, component: Component, exact }) => (
			<RouteContainer key={`ROUTE_${path}`}>
				<PublicRouter path={path} component={Component} exact={exact} />
			</RouteContainer>
		));

	return (
		<Switch>
			<PoseGroup>
				{matched.length ? (
					matched
				) : (
					<PublicRouter component={PageNotFound} key={`ROUTE_${404}`} />
				)}
			</PoseGroup>
		</Switch>
	);
};
