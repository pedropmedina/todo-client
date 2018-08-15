import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

import TaskForm from './TaskForm';

const CancelButton = styled(Link)`
	position: fixed;
	bottom: 10rem;
	right: 10rem;
	display: block;
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	background-color: tomato;
	color: white;
	text-decoration: none;

	> span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const AddTask = () => (
	<React.Fragment>
		<TaskForm />
		<CancelButton to="/me/dashboard">
			<span>CANCEL</span>
		</CancelButton>
	</React.Fragment>
);

export default AddTask;
