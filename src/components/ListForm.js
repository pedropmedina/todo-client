import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
	width: 100%;
	height: 5rem;
	position: relative;
	border: 0.1rem solid #eee;
	margin-bottom: 3rem;

	> input {
		display: inline-block;
		width: 75%;
		height: 100%;
		border: none;
		text-indent: 1rem;
		font-size: 1.6rem;
		outline: none;
		background-color: inherit;
		border-left: 0.3rem solid transparent;
		transition: 0.2s;

		&::placeholder {
			color: #aeaeae;
		}

		&:focus {
			border-left: 0.3rem solid #aaa;
			transform: translateX(0.5rem);
		}
	}
`;

class ListForm extends Component {
	state = {
		fields: {
			content: '',
		},
	};

	handleFields = event => {
		const { name, value } = event.target;
		const fields = this.state.fields;
		fields[name] = value;
		this.setState({ fields });
	};

	render() {
		const { content } = this.state.fields;
		return (
			<React.Fragment>
				<Form
					onSubmit={event => {
						event.preventDefault();
						this.props.newList(content);
						const fields = { content: '' };
						this.setState({ fields });
					}}
				>
					<input
						type="text"
						placeholder="Go ahead and add to your list."
						name="content"
						value={content}
						onChange={this.handleFields}
					/>
				</Form>
			</React.Fragment>
		);
	}
}

export default ListForm;
