import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const slideInFromTop = keyframes`
	from {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0
	}

	to {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		opacity: 1;
	}
`;

const Wrapper = styled.div`
	/* border: 0.3rem solid blue; */
	/* width: 50rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */
	/* animation-name: ${slideInFromTop};
	animation-duration: 1.3s;
	animation-timing-function: ease-in; */
	/* animation-delay: 2s; */
	/* border: .2rem solid blue; */
`;

const Form = styled.form`
	width: 50rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	> * {
		width: 100%;

		&:not(:last-child) {
			height: 5rem;
			margin-bottom: 3rem;
			text-indent: 1rem;
			font-size: 1.6rem;
			letter-spacing: 0.1rem;
			border: none;

			&::placeholder {
				color: #aeaeae;
			}
		}

		&:last-child {
			border: none;
			background-color: tomato;
			color: white;
			font-size: 1.6rem;
			padding: 2rem;
		}
	}
`;

class TaskForm extends Component {
	state = {
		fields: {
			name: this.props.name || '',
			description: this.props.description || '',
			dueDate: this.props.description || '',
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
				<Form onSubmit={event => event.preventDefault()}>
					<input
						type="text"
						name="name"
						placeholder="name"
						value={name}
						onChange={this.handleInputFields}
					/>
					<input
						type="text"
						name="description"
						placeholder="description"
						value={description}
						onChange={this.handleInputFields}
					/>
					<input
						type="text"
						name="dueDate"
						placeholder="dueDate"
						value={dueDate}
						onChange={this.handleInputFields}
					/>
					<button>Add</button>
				</Form>
			</React.Fragment>
		);
	}
}

export default TaskForm;
