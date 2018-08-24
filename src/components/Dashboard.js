import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Header from './Header';
import TasksList from './TasksList';

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

const GET_TASKS = gql`
	{
		tasks: findTasks {
			id
			name
			description
			completed
			dueDate
		}
	}
`;

const Dashboard = () => (
	<Query query={GET_TASKS}>
		{({ loading, error, data, client }) => {
			if (loading) return <div>LOADING...</div>;
			return (
				<React.Fragment>
					<Header tasks={data.tasks} />
					<TasksList tasks={data.tasks} />
					<AddButton to="/me/add">
						<span>ADD</span>
					</AddButton>
				</React.Fragment>
			);
		}}
	</Query>
);

export default Dashboard;

// TODO: Filter bar:
// 1- toggle all completed/uncompleted
// 2- preview todos left
// 3- show all
// 4- show active
// 5- show completed

// TODO: Search bar

// TODO: Move to day arrows on side

// TODO: Add sidebar for more options including calendar to filter todos

// TODO: Add show list or add list on accordion mode

// TODO: Add graphs for stats

// TODO: Add top bar for profile settings and current day and time
