import React from 'react';

import AuthForm from './AuthForm';

const style = {
	backgroundColor: 'green',
	position: 'absolute',
	top: '30px',
	bottom: 0,
	left: 0,
	right: 0,
};

const Login = props => (
	<div>
		<AuthForm login push={props.history.push} />
	</div>
);

export default Login;
