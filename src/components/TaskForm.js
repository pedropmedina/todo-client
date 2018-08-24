import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';

const Form = styled.form`
	width: 50rem;
	position: absolute;
	top: 25%;
	left: 50%;
	transform: translate(-50%, -25%);

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

		&:last-child {
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
	}

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

class TaskForm extends Component {
	state = {
		fields: {
			name: this.props.name || '',
			description: this.props.description || '',
			dueDate: this.props.dueDate || new Date(),
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
		return (
			<React.Fragment>
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
							value={new Date(dueDate)}
							onChange={dueDate => {
								const fields = this.state.fields;
								fields['dueDate'] = dueDate.getTime();
								this.setState({ fields });
							}}
						/>
						<button>Add</button>
					</div>
				</Form>
				<CancelButton to="/me/dashboard">
					<span>CANCEL</span>
				</CancelButton>
			</React.Fragment>
		);
	}
}

export default TaskForm;
