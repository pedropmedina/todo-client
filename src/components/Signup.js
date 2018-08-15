import React from 'react';

import AuthForm from './AuthForm';

const Signup = props => (
	<div>
		<AuthForm push={props.history.push} />
	</div>
);

export default Signup;
