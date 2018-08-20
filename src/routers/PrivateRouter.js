import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouter = ({ component: Component, ...rest }) => {
	const authorization = localStorage.getItem('authorization');
	return (
		<Route
			{...rest}
			render={props =>
				authorization ? (
					<React.Fragment>
						<Component {...props} />
					</React.Fragment>
				) : (
					<Redirect to="/auth/login" />
				)
			}
		/>
	);
};

export default PrivateRouter;
