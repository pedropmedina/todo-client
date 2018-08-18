import React from 'react';

import AuthForm from './AuthForm';

const Login = props => (
	<div>
		<AuthForm login push={props.history.push} />
	</div>
);

export default Login;
