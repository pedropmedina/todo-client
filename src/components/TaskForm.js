import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-date-picker';
import { X } from 'react-feather';

import { history } from '../index';

import List from './List';

const Wrapper = styled.div`
	padding-top: 7rem;
`;

const Form = styled.form`
	width: 50rem;
	margin: 0 auto 7rem auto;
	/* position: absolute;
	top: 25%;
	left: 50%;
	transform: translate(-50%, -25%); */

	> input {
		transition: 0.2s;

		&::placeholder {
			color: #aeaeae;
		}

		&:focus {
			border-left: 0.3rem solid #eee;
			transform: translateX(0.5rem);
		}
	}

	> * {
		width: 100%;
		height: 5rem;
		margin-bottom: 3rem;
		text-indent: 1rem;
		font-size: 1.6rem;
		letter-spacing: 0.1rem;
		border: none;
		border-left: 0.3rem solid transparent;
		outline: none;

		&:nth-child(3) {
			display: flex;

			> * {
				flex: 1;
			}

			> button {
				border: none;
				border: 0.15rem solid #aeaeae;
				color: #aeaeae;
				font-size: 1.6rem;
				outline: none;
				transition: 0.2s;

				&:hover {
					border-color: #000;
					color: #000;
				}
			}
		}

		&:nth-child(4) {
			display: flex;
			justify-content: center;
			margin-top: 5rem;

			> button {
				width: 10rem;
				margin: 0 1rem;
				border: none;
				border: 0.15rem solid #aeaeae;
				color: #aeaeae;
				transition: 0.2s;

				&:hover {
					border: 0.15rem solid #000;
					color: #000;
				}
			}
		}
	}
`;

const DP = styled(DatePicker)`
	.react-date-picker__button {
		border: none;
		text-indent: initial;
		padding-left: 1rem;
	}

	.react-calendar {
		padding: 1rem;
		border: none;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
	}
`;

const CancelButton = styled.button`
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

class TaskForm extends Component {
	state = {
		fields: {
			name: this.props.name || '',
			description: this.props.description || '',
			dueDate: this.props.dueDate || Date.now(),
		},
	};

	handleInputFields = event => {
		const { name, value } = event.target;
		const fields = this.state.fields;
		fields[name] = value;
		this.setState(() => ({ fields }));
	};

	render() {
		const { name, description, dueDate } = this.state.fields;
		const { openList } = this.props;
		return (
			<Wrapper>
				<Form
					onSubmit={event => {
						event.preventDefault();
						if (this.props.newTask) {
							this.props.newTask({
								variables: { input: { name, description, dueDate } },
							});
						} else {
							this.props.updateTask({
								variables: {
									input: { id: this.props.id, name, description, dueDate },
									// optimistic respose must return the exact data as the
									// query, else it won't work. By using optimistic UI
									// we tell apollo to return this before the server resolves
									// speeding up client rendering. Apollo will replace
									// optimistic respose with the respose from server
									// when resolved.
									optimisticResponse: {
										__typename: 'Mutation',
										updateTask: {
											__typename: 'Task',
											id: this.props.id,
											name,
											description,
											dueDate,
										},
									},
								},
							});
						}
					}}
				>
					<input
						type="text"
						name="name"
						placeholder="What do you need?"
						value={name}
						onChange={this.handleInputFields}
					/>
					<input
						type="text"
						name="description"
						placeholder="Too complex of a need? Add a description."
						value={description}
						onChange={this.handleInputFields}
					/>
					<div>
						<DP
							value={dueDate ? new Date(dueDate) : null}
							onChange={dueDate => {
								const fields = this.state.fields;

								if (dueDate) {
									fields['dueDate'] = dueDate.getTime();
									this.setState({ fields });
								} else {
									fields['dueDate'] = null;
									this.setState({ fields });
								}
							}}
						/>
						<button>Add</button>
					</div>

					{this.props.name ? (
						<div>
							{!!this.props.lists.length ? (
								<button type="button" onClick={this.props.onOpenList}>
									Show list
								</button>
							) : (
								<button type="button" onClick={this.props.onOpenList}>
									Add list
								</button>
							)}
						</div>
					) : null}
				</Form>

				{this.props.name ? (
					<List openList={openList} task={this.props.id} />
				) : null}

				<CancelButton
					onClick={() => {
						if (this.props.onCloseList) {
							this.props.onCloseList();
						}
						history.push('/me/dashboard');
					}}
				>
					<i>
						<X />
					</i>
				</CancelButton>
			</Wrapper>
		);
	}
}

export default TaskForm;
