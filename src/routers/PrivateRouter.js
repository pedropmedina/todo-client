import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';

const PrivateRouter = ({ component: Component, ...rest }) => {
	const authorization = localStorage.getItem('authorization');
	return (
		<Route
			{...rest}
			render={props =>
				authorization ? (
					<React.Fragment>
						<Header />
						<Component {...props} />
					</React.Fragment>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRouter;
