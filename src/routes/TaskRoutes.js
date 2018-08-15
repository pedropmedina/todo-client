import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import PrivateRouter from '../routers/PrivateRouter';

import Dashboard from '../components/Dashboard';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';

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

export default ({ location, match }) => (
	<CSSTransitionGroup>
		<CSSTransition
			key={location.key}
			timeout={{ enter: 300, exit: 100 }}
			classNames="fade"
		>
			<Switch location={location}>
				<PrivateRouter path={`${match.url}/dashboard`} component={Dashboard} />
				<PrivateRouter path={`${match.url}/add`} component={AddTask} />
				<PrivateRouter path={`${match.url}/edit/:id`} component={EditTask} />
			</Switch>
		</CSSTransition>
	</CSSTransitionGroup>
);
