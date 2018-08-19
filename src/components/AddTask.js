import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

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
	z-index: 100;

	> span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const ADD_TASK = gql`
	mutation AddTask($input: NewTaskInput!) {
		newTask(input: $input) {
			id
			name
			description
			dueDate
		}
	}
`;

const GET_TASKS = gql`
	{
		tasks: findTasks {
			id
			name
			description
			dueDate
		}
	}
`;

/*
In case I decide to use ApolloConsumer instead
----------------------------------------------

const updateCache = client => async newTask => {
	const { tasks } = await client.readQuery({ query: GET_TASKS });
	client.writeQuery({
		query: GET_TASKS,
		data: { tasks: [...tasks, newTask] },
	});
};

const addNewTask = client => async ({ name, description, dueDate }) => {
	const { data } = await client.mutate({
		mutation: ADD_TASK,
		variables: { input: { name, description, dueDate } },
	});
	updateCache(client)(data.newTask);
};
*/

// Can't find field <field> on object ROOT_QUERY undefined when
// updating the cache from this page where the mutation is taking place.
// This happens because on this page there's not ROOT_QUERY, only
// ROOT_MUTATION exist as that's the operation taking place from here.
// To fix issue push to Dashboard where I'm querying the tasks list,
// thus ROOT_QUERY is going be present under cache.
// read more: https://github.com/apollographql/apollo-client/issues/1701
const AddTask = props => (
	<Mutation
		mutation={ADD_TASK}
		update={async (cache, { data: { newTask } }) => {
			const { tasks } = await cache.readQuery({ query: GET_TASKS });
			cache.writeQuery({
				query: GET_TASKS,
				data: { tasks: [...tasks, newTask] },
			});
			props.history.push('/me/dashboard');
		}}
	>
		{newTask => (
			<React.Fragment>
				<TaskForm newTask={newTask} />
				<CancelButton to="/me/dashboard">
					<span>CANCEL</span>
				</CancelButton>
			</React.Fragment>
		)}
	</Mutation>
);

export default AddTask;
