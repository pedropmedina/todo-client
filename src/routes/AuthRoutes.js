import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import PublicRouter from '../routers/PublicRouter';

import Login from '../components/Login';
import Signup from '../components/Signup';

const CSSTransitionGroup = styled(TransitionGroup)`
	height: 100vh;

	.slide-enter {
		opacity: 0;
		z-index: 1;
		position: absolute;
		left: 45%;
		top: 50%;
		transform: translate(-45%, -50%);
	}

	.slide-enter.slide-enter-active {
		opacity: 1;
		left: 50%;
		transform: translateX(-50%);
		transition: all 250ms ease-in;
	}

	.slide-exit.slide-exit-active {
		opacity: 0;
	}
`;

export default ({ location, match }) =>
	console.log(match) || (
		<CSSTransitionGroup>
			<CSSTransition
				key={location.key}
				timeout={{ enter: 300, exit: 100 }}
				classNames={'slide'}
			>
				<Switch location={location}>
					<PublicRouter
						path={`${match.url}`}
						exact
						render={() => <div>Hello there</div>}
					/>
					<PublicRouter path={`${match.url}/login`} exact component={Login} />
					<PublicRouter path={`${match.url}/signup`} exact component={Signup} />
				</Switch>
			</CSSTransition>
		</CSSTransitionGroup>
	);
