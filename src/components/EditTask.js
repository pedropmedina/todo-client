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

const GET_LOCAL_STATE = gql`
	{
		openList @client
	}
`;

const onOpenList = client => {
	client.writeData({ data: { openList: true } });
};

const EditTask = props => (
	<React.Fragment>
		<Query query={GET_LOCAL_STATE}>
			{({ data, client }) => {
				return (
					<Query query={FIND_TASK} variables={{ id: props.match.params.id }}>
						{({ data: data1 }) => {
							return (
								<Mutation
									mutation={UPDATE_TASK}
									onCompleted={data => {
										props.history.push('/me/dashboard');
									}}
								>
									{updateTask => (
										<TaskForm
											{...data1.task}
											{...data}
											updateTask={updateTask}
											onOpenList={() => onOpenList(client)}
										/>
									)}
								</Mutation>
							);
						}}
					</Query>
				);
			}}
		</Query>
	</React.Fragment>
);

export default EditTask;
