import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

	> button {
		border: none;
		border: 0.2rem solid #aaa;
		padding: 1rem;
		background-color: inherit;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 20%;

		&:hover {
			border: 0.2rem solid #000;
		}
	}
`;

const NEW_LIST = gql`
	mutation NewList($input: NewListInput!) {
		newList(input: $input) {
			id
			content
			task {
				id
			}
		}
	}
`;

const GET_LISTS = gql`
	query {
		lists: findLists {
			id
			content
			task {
				id
			}
		}
	}
`;

class ListForm extends Component {
	state = {
		fields: {
			content: '',
			task: this.props.task || '',
		},
		listText: '',
	};

	handleFields = event => {
		const { name, value } = event.target;
		const fields = this.state.fields;
		fields[name] = value;
		this.setState({ fields });
	};

	render() {
		const { content, task } = this.state.fields;
		return (
			<Mutation
				mutation={NEW_LIST}
				update={async (cache, { data: { newList } }) => {
					// const d = await cache.readQuery({ query: GET_LISTS });
					// cache.writeQuery({
					// 	query: GET_LISTS,
					// 	data: { lists: [...lists, newList] },
					// });
				}}
			>
				{newList => {
					return (
						<React.Fragment>
							<Form
								onSubmit={event => {
									event.preventDefault();
									newList({ variables: { input: { content, task } } });
								}}
							>
								<input
									type="text"
									placeholder="Go ahead and add to your list."
									name="content"
									value={content}
									onChange={this.handleFields}
								/>
								<button type="button">Save list</button>
							</Form>
						</React.Fragment>
					);
				}}
			</Mutation>
		);
	}
}

export default ListForm;
