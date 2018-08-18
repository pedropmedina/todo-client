import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import TaskForm from './TaskForm';

const GET_SHOW_TASK_FORM = gql`
	{
		showTaskForm @client
	}
`;

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
	z-index: 100;

	> span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const StyledBg = styled.div`
	/* width: ${props => (props.showTaskForm ? '100%' : '5rem')};
	height: ${props => (props.showTaskForm ? '100vh' : '5rem')};
	background-color: ${props => (props.showTaskForm ? 'papayawhip' : 'white')};
	position: fixed;
	bottom: ${props => (props.showTaskForm ? 'initial' : '5rem')};
	right: ${props => (props.showTaskForm ? 'initial' : '5rem')}; */
`;

const config = {
	enter: {
		opacity: 1,
		scale: 2,
		transition: {
			scale: { ease: 'easeInOut', duration: 1000 },
		},
	},
	exit: {
		// opacity: 0,
		transition: {
			opacity: { ease: 'easeOut', duration: 300 },
		},
	},
};

const Bg = posed(StyledBg)(config);

const AddTask = () => (
	<Query query={GET_SHOW_TASK_FORM}>
		{({ loading, error, data, client }) => (
			<React.Fragment>
				<TaskForm key={`FORM_${1}`} />
				<CancelButton
					to="/me/dashboard"
					onClick={() => {
						client.writeData({ data: { showTaskForm: false } });
					}}
				>
					<span>CANCEL</span>
				</CancelButton>
			</React.Fragment>
		)}
	</Query>
);

export default AddTask;
