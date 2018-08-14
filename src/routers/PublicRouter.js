import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRouter = ({ component: Component, ...rest }) => {
	const authorization = localStorage.getItem('authorization');
	return (
		<Route
			{...rest}
			render={props =>
				!authorization ? <Component {...props} /> : <Redirect to="/dashboard" />
			}
		/>
	);
};

export default PublicRouter;
