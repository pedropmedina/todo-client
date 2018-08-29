import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Edit, CheckSquare, XSquare, Square } from 'react-feather';

import { history } from '../index';

// Styles -------------------------------------
const ListItem = styled.li`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	position: relative;
	margin-bottom: 1.5rem;
	color: ${({ completed }) => (completed ? 'rgb(196, 196, 196)' : 'initial')};
	text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
	border-bottom: 0.1rem solid #eee;
	box-shadow: ${({ showList, completed }) =>
		showList && !completed ? '0 0.3rem 0.7rem rgba(0, 0, 0, .1)' : 'unset'};

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
	}

	> label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
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

const ListView = styled.div`
	flex: unset;
	width: 100%;
	padding: 2rem 3rem;

	> ul {
		list-style: none;

		> li {
			margin-bottom: 1rem;
			padding: 1rem;
			border-bottom: 0.1rem solid #eee;
			font-size: 1.2rem;
			color: #aaa;
		}
	}

	> button {
		border: none;
		border-radius: 0.4rem;
		margin: 1.5rem 0 3rem 0;
		font-size: 1.2rem;
		padding: 1rem 3rem;
		background-color: rgb(252, 91, 88);
		color: #fff;
		cursor: pointer;
	}
`;

const SVGEdit = styled(Edit)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

const SVGDelete = styled(XSquare)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

const SVGUnchecked = styled(Square)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

const SVGChecked = styled(CheckSquare)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

// Graphql queries --------------------------
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

// Functionality --------------------------
class Task extends Component {
	state = {
		showList: false,
	};

	render() {
		const { id, name, description, completed, dueDate, lists } = this.props;
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
							<ListItem completed={completed} showList={this.state.showList}>
								{lists.length && !completed && !this.state.showList ? (
									<ListPreview
										onClick={() => this.setState({ showList: true })}
									>
										<i>View {lists.length} items in list.</i>
									</ListPreview>
								) : null}

								<ToggleCompletedWrapper>
									<input
										type="checkbox"
										id={`toggle-complete-${id}`}
										checked={this.props.completed}
										onChange={event => {
											const { checked } = event.target;
											toggleCompleted({
												variables: { input: { id, completed: checked } },
											});
										}}
									/>
									<label htmlFor={`toggle-complete-${id}`}>
										{completed ? <SVGChecked /> : <SVGUnchecked />}
									</label>
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
								{!!this.state.showList &&
									!completed && (
										<ListView>
											<ul>
												{lists.map(({ id, content }) => {
													return <li key={id}>{content}</li>;
												})}
											</ul>
											<button
												onClick={() => this.setState({ showList: false })}
											>
												Hide
											</button>
										</ListView>
									)}
							</ListItem>
						)}
					</Mutation>
				)}
			</Mutation>
		);
	}
}

export default Task;
