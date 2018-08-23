import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Task from './Task';

const Wrapper = styled.article`
	width: 70rem;
	/* position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */
	margin: 7rem auto 4rem auto;
`;

const Table = styled.section`
	/* box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2); */
`;

const TableHeader = styled.header`
	display: flex;
	justify-content: flex-start;
	/* background-color: #eee; */
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

				&:checked + label::after {
					background-color: #aaa;
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
				border: 0.2rem solid #aaa;
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

class TasksList extends Component {
	state = {
		toggleAllCompleted: false,
	};

	handleToggleAllCompleted = (event, toggleAllCompleted) => {
		const { checked } = event.target;
		this.setState(() => ({ toggleAllCompleted: checked }), toggleAllCompleted);
	};

	render() {
		return (
			<Mutation
				mutation={TOGGLE_ALL_COMPLETED}
				variables={{ completed: this.state.toggleAllCompleted }}
			>
				{toggleAllCompleted => (
					<Wrapper>
						<Table>
							<TableHeader>
								<h4>
									<input
										type="checkbox"
										id="toggleAll"
										checked={this.state.toggleAllCompleted}
										onChange={event =>
											this.handleToggleAllCompleted(event, toggleAllCompleted)
										}
									/>
									<label htmlFor="toggleAll" />
								</h4>
								<h4 />
							</TableHeader>
							<ul>
								{this.props.tasks.map(({ id, ...task }) => (
									<Task key={id} {...task} id={id} />
								))}
							</ul>
						</Table>
					</Wrapper>
				)}
			</Mutation>
		);
	}
}

export default TasksList;
