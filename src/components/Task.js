import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ListItem = styled.li`
	display: flex;
	justify-content: flex-start;
	position: relative;

	> * {
		flex: 9;
		padding: 2rem;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;

		&:last-child {
			> * {
				padding: 1rem;
				cursor: pointer;
			}
		}

		&:first-child {
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
					background-color: tomato;
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
				border: none;
				border-radius: 50%;
				background-color: crimson;

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
		}
	}

	&:nth-child(even) {
		background-color: #eee;
	}

	&:hover > span:last-child {
		visibility: visible;
		background-color: tomato;
		color: white;
	}
`;

const Controllers = styled.span`
	position: absolute;
	left: 100%;
	visibility: hidden;
`;

const Anchor = styled(Link)`
	text-decoration: inherit;
	color: inherit;
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

const Task = ({ id, name, description, dueDate }) => (
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
			<ListItem>
				<span>
					<input type="checkbox" id={`toggle-complete-${id}`} />
					<label htmlFor={`toggle-complete-${id}`} />
				</span>
				<span>{name}</span>
				<span>{description}</span>
				<span>{dueDate}</span>
				<Controllers>
					<span>
						<Anchor to={`/me/edit/${id}`}>O</Anchor>
					</span>
					<span onClick={removeTask}>X</span>
				</Controllers>
			</ListItem>
		)}
	</Mutation>
);

export default Task;
