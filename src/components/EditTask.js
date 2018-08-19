import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import TaskForm from './TaskForm';

const FIND_TASK = gql`
	query FindTaskById($id: ID!) {
		task: findTask(id: $id) {
			id
			name
			description
			dueDate
		}
	}
`;

const UPDATE_TASK = gql`
	mutation UpdateTask($input: UpdateTaskInput!) {
		updateTask(input: $input) {
			id
			name
			description
			dueDate
		}
	}
`;

const EditTask = props => (
	<React.Fragment>
		<Query query={FIND_TASK} variables={{ id: props.match.params.id }}>
			{({ loading, error, data }) => {
				if (loading) return <div>LOADING...</div>;
				return (
					<Mutation
						mutation={UPDATE_TASK}
						onCompleted={data => {
							props.history.push('/me/dashboard');
						}}
					>
						{updateTask => <TaskForm {...data.task} updateTask={updateTask} />}
					</Mutation>
				);
			}}
		</Query>
	</React.Fragment>
);

export default EditTask;
