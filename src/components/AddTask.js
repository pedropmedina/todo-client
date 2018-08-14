import React from 'react';
import styled, { keyframes } from 'styled-components';

import TaskForm from './TaskForm';

const changeBackground = keyframes`
	from {
		background-color: #fff;
	}
	to {
		background-color: #eee;
	}
`;

const Wrapper = styled.div`
	height: 100vh;
	background-color: #eee;
	animation-name: ${changeBackground};
	animation-timing-function: linear;
	animation-duration: 1.5s;
`;

const AddTask = () => (
	<Wrapper>
		<TaskForm />
	</Wrapper>
);

export default AddTask;
