import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';

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
		scale: 1,
		x: 0,
		transition: {
			opacity: { ease: 'easeIn', duration: 100 },
			default: {
				type: 'spring',
				stiffness: 70,
				ease: 'easeIn',
			},
		},
	},
	exit: {
		opacity: 0,
		scale: 1.5,
		transition: {
			opacity: { ease: 'easeOut', duration: 200 },
			default: { ease: 'easeOut', duration: 300 },
		},
	},
};

const StyledRouteContainer = styled.div`
	height: 100vh;
	width: 100%;
`;

const RouteContainer = posed(StyledRouteContainer)(config);

export default ({ location, match }) => {
	const matched = matches
		.filter(filterRoutes(location.pathname))
		.map(({ path, component: Component, exact }) => (
			<RouteContainer key={`ROUTE_${path}`}>
				<PrivateRouter path={path} component={Component} exact={exact} />
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
