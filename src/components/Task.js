import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Edit, Delete } from 'react-feather';

import { history } from '../index';

const ListItem = styled.li`
	display: flex;
	justify-content: flex-start;
	position: relative;
	color: ${({ completed }) => (completed ? 'rgb(196, 196, 196)' : 'initial')};
	text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
	border-bottom: 0.1rem solid #eee;

	> * {
		flex: 9;
		padding: 2.5rem 2rem;
		font-size: 1.6rem;
		letter-spacing: 0.1rem;
	}

	&:hover > span:last-child,
	&:hover > span:first-child {
		visibility: visible;
		background-color: inherit;
	}
`;

const ToggleCompletedWrapper = styled.span`
	flex: 1;
	position: relative;

	> input {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		visibility: hidden;
		z-index: 1;

		&:checked + label::after {
			background-color: rgba(195, 57, 34, 0.5);
		}
	}

	> label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		width: 2rem;
		height: 2rem;
		border: 0.2rem solid rgba(195, 57, 34, 0.5);
		border-radius: 50%;

		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: inline-block;
			width: 1rem;
			height: 1rem;
			background-color: transparent;
			border-radius: 50%;
			line-height: 1;
		}
	}
`;

const Controllers = styled.span`
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	visibility: hidden;
	display: flex;
	padding: 0;
	width: 10rem;

	> * {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
`;

const ListPreview = styled.span`
	position: absolute;
	right: 100%;
	top: 0;
	bottom: 0;
	visibility: hidden;
	width: 8rem;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	> i {
		color: #aaa;

		&:hover {
			color: #000;
		}
	}
`;

const ContentWrapper = styled.span`
	display: flex;
	flex-direction: column;

	> :last-child {
		margin-top: 0.5rem;
		font-size: 1.4rem;
		font-style: italic;
		text-decoration: underline;
		text-indent: 0.5rem;
		color: #ddd;
	}
`;

const SVGEdit = styled(Edit)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

const SVGDelete = styled(Delete)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

const REMOVE_TASK = gql`
	mutation RemoveTaskById($id: ID!) {
		removeTask(id: $id) {
			id
			name
		}
	}
`;

const GET_TASKS = gql`
	{
		tasks: findTasks {
			id
		}
	}
`;

const UPDATE_TASK = gql`
	mutation UpdateTask($input: UpdateTaskInput!) {
		updateTask(input: $input) {
			id
			completed
		}
	}
`;

const Task = props => {
	const { id, name, description, completed, dueDate, lists } = props;
	return (
		<Mutation
			mutation={REMOVE_TASK}
			variables={{ id }}
			update={(cache, { data: { removeTask } }) => {
				const { tasks } = cache.readQuery({ query: GET_TASKS });
				cache.writeQuery({
					query: GET_TASKS,
					data: { tasks: tasks.filter(task => task.id !== id) },
				});
			}}
		>
			{removeTask => (
				<Mutation mutation={UPDATE_TASK}>
					{toggleCompleted => (
						<ListItem completed={completed}>
							{lists.length ? (
								<ListPreview>
									<i>{lists.length} items in list.</i>
								</ListPreview>
							) : null}

							<ToggleCompletedWrapper>
								<input
									type="checkbox"
									id={`toggle-complete-${id}`}
									checked={props.completed}
									onChange={event => {
										const { checked } = event.target;
										toggleCompleted({
											variables: { input: { id, completed: checked } },
										});
									}}
								/>
								<label htmlFor={`toggle-complete-${id}`} />
							</ToggleCompletedWrapper>

							<ContentWrapper>
								<span>{name}</span>
								<span>{description}</span>
							</ContentWrapper>

							<Controllers>
								<span onClick={() => history.push(`/me/edit/${id}`)}>
									<SVGEdit />
								</span>
								<span onClick={removeTask}>
									<SVGDelete />
								</span>
							</Controllers>
						</ListItem>
					)}
				</Mutation>
			)}
		</Mutation>
	);
};

export default Task;
