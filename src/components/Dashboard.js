import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_SHOW_TASK_FORM = gql`
	{
		showTaskForm @client
	}
`;

const AddButton = styled(Link)`
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

const Dashboard = () => (
	<Query query={GET_SHOW_TASK_FORM}>
		{({ loading, error, data, client }) => (
			<React.Fragment>
				<AddButton
					to="/me/add"
					onClick={() => {
						client.writeData({ data: { showTaskForm: true } });
					}}
				>
					<span>ADD</span>
				</AddButton>
			</React.Fragment>
		)}
	</Query>
);

export default Dashboard;
