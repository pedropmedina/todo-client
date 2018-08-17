import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

import filterRoutes from '../helpers/filterRoutes';

import PrivateRouter from '../routers/PrivateRouter';

import Dashboard from '../components/Dashboard';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import PageNotFound from '../components/404';

export const matches = [
	{
		path: '/me',
		exact: true,
		component: () => <Redirect to="/me/dashboard" />,
	},
	{
		path: '/me/dashboard',
		exact: true,
		component: Dashboard,
	},
	{
		path: '/me/add',
		exact: true,
		component: AddTask,
	},
	{
		path: '/me/edit/:id',
		exact: true,
		component: EditTask,
	},
];

const config = {
	enter: {
		opacity: 1,
		transition: { opacity: { ease: 'easeIn', duration: 300 } },
	},
	exit: {
		opacity: 0,
		transition: { opacity: { ease: 'easeOut', duration: 300 } },
	},
};

const RouteContainer = posed.div(config);

export default ({ location, match }) => {
	const matched = matches
		.filter(filterRoutes(location.pathname))
		.map(({ path, component: Component, exact }) => (
			<RouteContainer key={`ROUTE_${path}`}>
				<PrivateRouter path={path} component={Component} exact={exact} />;
			</RouteContainer>
		));

	return (
		<Switch>
			<PoseGroup>
				{matched.length ? (
					matched
				) : (
					<PrivateRouter component={PageNotFound} key={`ROUTE_${404}`} />
				)}
			</PoseGroup>
		</Switch>
	);
};
