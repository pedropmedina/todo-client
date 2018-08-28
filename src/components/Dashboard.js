import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Plus } from 'react-feather';

import Header from './Header';
import TasksList from './TasksList';

const AddButton = styled.button`
	position: fixed;
	bottom: 10rem;
	right: 5rem;
	width: 7rem;
	height: 7rem;
	border: none;
	border-radius: 50%;
	background-color: #aaa;
	color: white;
	outline: none;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	transition: 0.2s;

	&:hover {
		transform: translateY(-0.3rem);
	}

	&:active {
		transform: translateY(0.3rem);
		box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
	}

	> i {
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
			lists {
				id
				content
			}
		}
	}
`;

const Dashboard = props => (
	<Query query={GET_TASKS}>
		{({ loading, error, data, client }) => {
			if (loading) return <div>LOADING...</div>;
			return (
				<React.Fragment>
					<Header tasks={data.tasks} />
					<TasksList tasks={data.tasks} />
					<AddButton onClick={() => props.history.push('/me/add')}>
						<i>
							<Plus />
						</i>
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
