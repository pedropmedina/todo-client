import React from 'react';

import AuthForm from './AuthForm';

const style = {
	backgroundColor: 'purple',
	position: 'absolute',
	top: '30px',
	bottom: 0,
	left: 0,
	right: 0,
};

const Signup = props => (
	<div>
		<AuthForm push={props.history.push} />
	</div>
);

export default Signup;
