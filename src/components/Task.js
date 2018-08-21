import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ListItem = styled.li`
	display: flex;
	justify-content: flex-start;
	position: relative;
	background-color: ${({ completed }) =>
		completed ? 'rgb(238, 238, 238)' : 'initial'};
	color: ${({ completed }) => (completed ? 'rgb(196, 196, 196)' : 'initial')};

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

		&:nth-child(2) {
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
		}
	}

	/* &:nth-child(even) {
		background-color: #eee;
	} */

	&:hover > span:last-child,
	&:hover > span:first-child {
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

const List = styled.span`
	position: absolute;
	right: 100%;
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

const UPDATE_TASK = gql`
	mutation UpdateTask($input: UpdateTaskInput!) {
		updateTask(input: $input) {
			id
			completed
		}
	}
`;

class Task extends Component {
	state = {
		completed: this.props.completed || false,
	};

	handleToggleCompleted = (event, toggleCompleted) => {
		const { checked } = event.target;
		this.setState(() => ({ completed: checked }), toggleCompleted);
	};

	render() {
		const { id, name, description, completed, dueDate } = this.props;
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
					<Mutation
						mutation={UPDATE_TASK}
						variables={{ input: { id, completed: this.state.completed } }}
					>
						{toggleCompleted => (
							<ListItem completed={completed}>
								<List>LIST</List>
								<span>
									<input
										type="checkbox"
										id={`toggle-complete-${id}`}
										checked={this.state.completed}
										onChange={event => {
											this.handleToggleCompleted(event, toggleCompleted);
										}}
									/>
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
				)}
			</Mutation>
		);
	}
}

export default Task;
