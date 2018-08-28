import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ChevronDown, ChevronUp } from 'react-feather';

import filterTasks from '../selectors/filterTasks';

import Task from './Task';

const Wrapper = styled.article`
	width: 70rem;
	margin: 7rem auto 4rem auto;
`;

const TableHeader = styled.header`
	display: flex;
	justify-content: flex-start;
	margin-bottom: 1.5rem;

	> * {
		flex: 9;
		padding: 2rem;
		color: white;
		font-size: 1.6rem;
		font-weight: lighter;
		letter-spacing: 0.1rem;
		text-transform: uppercase;

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

				/* &:checked + label::after {
					background-color: #aaa;
				} */
			}

			> label {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: inline-block;
				/* width: 2rem;
				height: 2rem;
				border: 0.2rem solid #aaa;
				border-radius: 50%; */

				/* &::after {
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
				} */
			}
		}
	}
`;

const PreviewMessage = styled.p`
	text-align: center;
	font-size: 2rem;
	padding: 9rem;
	color: #aaa;
`;

const SVGChevronDown = styled(ChevronDown)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

const SVGChevronUp = styled(ChevronUp)`
	color: #aaa;
	width: 2.5rem;

	&:hover {
		color: #000;
	}
`;

const TOGGLE_ALL_COMPLETED = gql`
	mutation ToggleAllCompleted($completed: Boolean!) {
		toggleAllCompleted(completed: $completed) {
			id
			name
			description
			completed
			dueDate
		}
	}
`;

const GET_LOCAL_STATE = gql`
	{
		filter @client
		dates @client
		currentDate @client
		toggleAllCompleted @client
	}
`;

const TasksList = props => (
	<Query query={GET_LOCAL_STATE}>
		{({ loading, error, data, client }) => {
			if (loading) return <div>Loading...</div>;

			const { filter, dates, currentDate, toggleAllCompleted } = data;

			// sort completed to end when in 'all' view
			let tasks;
			if (filter === 'all') {
				tasks = filterTasks(props.tasks, data).sort(
					(a, b) => (a.completed ? 1 : -1),
				);
			} else {
				tasks = filterTasks(props.tasks, data);
			}

			return (
				<Mutation
					mutation={TOGGLE_ALL_COMPLETED}
					variables={{ completed: toggleAllCompleted }}
				>
					{toggleAllCompleted => (
						<Wrapper>
							<section>
								<TableHeader>
									<h4>
										<input
											type="checkbox"
											id="toggleAll"
											checked={data.toggleAllCompleted}
											onChange={async event => {
												const { checked } = event.target;
												await client.writeData({
													data: { toggleAllCompleted: checked },
												});
												toggleAllCompleted();
											}}
										/>
										<label htmlFor="toggleAll">
											{data.toggleAllCompleted ? (
												<SVGChevronUp />
											) : (
												<SVGChevronDown />
											)}
										</label>
									</h4>
									<h4 />
								</TableHeader>

								{filter === 'active' && !tasks.length ? (
									<PreviewMessage>
										Nothing else pending for the day!
									</PreviewMessage>
								) : filter === 'completed' && !tasks.length ? (
									<PreviewMessage>
										Apparently you haven't done much today.
									</PreviewMessage>
								) : (
									<ul>
										{tasks.map(({ id, ...task }) => (
											<Task key={id} {...task} id={id} />
										))}
									</ul>
								)}
							</section>
						</Wrapper>
					)}
				</Mutation>
			);
		}}
	</Query>
);

export default TasksList;
