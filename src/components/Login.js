import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

import AuthForm from './AuthForm';

class Login extends React.Component {
	render() {
		return (
			<div>
				<AuthForm login push={this.props.history.push} />
			</div>
		);
	}
}
export default Login;
