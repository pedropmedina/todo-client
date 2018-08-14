import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 50rem;
	transform: translate(-50%, -50%);

	> :last-child {
		margin-top: 2rem;
		font-size: 1.6rem;
		color: #aaa;
	}
`;

const Form = styled.form`
	padding: 5rem;
	box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);

	> * {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 3rem;
			text-indent: 1rem;
			height: 5rem;
			font-size: 1.2rem;
		}

		&:last-child {
			border: none;
			font-size: 1.6rem;
			background-color: tomato;
			color: white;
			padding: 2rem;
		}
	}
`;

const LOGIN = gql`
	mutation LoginUser($input: NewUserLoginInput!) {
		login(input: $input) {
			token
			user {
				id
				username
				email
			}
		}
	}
`;
const SIGNUP = gql`
	mutation SignupUser($input: NewUserSignupInput!) {
		signup(input: $input) {
			token
			user {
				id
				username
				email
			}
		}
	}
`;

class AuthForm extends Component {
	state = {
		fields: {
			username: '',
			email: '',
			password: '',
		},
	};

	handleInputField = event => {
		const { name, value } = event.target;
		const fields = this.state.fields;
		fields[name] = value;
		this.setState(() => ({ fields }));
	};

	confirmUser = data => {
		const { token } = this.props.login ? data.login : data.signup;
		this.saveUser(token);
	};

	saveUser = token => {
		localStorage.setItem('authorization', `Bearer ${token}`);
	};

	render() {
		const { username, email, password } = this.state.fields;
		return (
			<Wrapper>
				<Mutation
					mutation={this.props.login ? LOGIN : SIGNUP}
					variables={{
						input: this.props.login
							? { email, password }
							: { username, email, password },
					}}
					onCompleted={data => {
						this.confirmUser(data);
						this.setState(() => ({
							fields: { username: '', email: '', password: '' },
						}));
						this.props.push('/dashboard');
					}}
				>
					{(authUser, { loading, error, data }) => {
						return (
							<Form
								onSubmit={event => {
									event.preventDefault();
									authUser();
								}}
							>
								{!this.props.login && (
									<input
										type="text"
										name="username"
										placeholder="username"
										value={username}
										onChange={this.handleInputField}
									/>
								)}
								<input
									type="email"
									name="email"
									placeholder="email"
									value={email}
									onChange={this.handleInputField}
								/>
								<input
									type="password"
									name="password"
									placeholder="password"
									value={password}
									onChange={this.handleInputField}
								/>
								<button>{this.props.login ? 'Login' : 'Signup'}</button>
							</Form>
						);
					}}
				</Mutation>
				{this.props.login ? (
					<div>
						Don't have an account? - <Link to="/signup">Signup here →</Link>
					</div>
				) : (
					<div>
						Already own an account? - <Link to="/login">Login here →</Link>
					</div>
				)}
			</Wrapper>
		);
	}
}

export default AuthForm;
