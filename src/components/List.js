import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { history } from '../index';

import ListForm from './ListForm';

const ListWrapper = styled.div`
	width: 70rem;
	margin: 3rem auto;
	background-color: #eee;
	padding: 3rem;

	button {
		border: none;
		border: 0.2rem solid #aaa;
		padding: 1rem;
		background-color: inherit;
		width: 20%;
		margin-top: 2.5rem;

		&:hover {
			border: 0.2rem solid #000;
		}
	}
`;

const ListItems = styled.ul`
	margin-top: 2rem;
	list-style: none;
	font-size: 1.6rem;

	> li {
		border-bottom: 0.1rem solid #ddd;
		padding: 1rem 0;
	}
`;

const config = {
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			default: { ease: 'easeIn', duration: 300 },
		},
	},
	hidden: {
		opacity: 0,
		scale: 0.5,
		transition: {
			default: { ease: 'easeOut', duration: 500 },
		},
	},
};

const PosedWrapper = posed(ListWrapper)(config);

const FIND_TASK = gql`
	query FindTaskById($id: ID!) {
		task: findTask(id: $id) {
			id
			name
			description
			dueDate
			lists {
				id
				content
			}
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

const List = ({ openList, task }) => (
	<Query query={FIND_TASK} variables={{ id: task }}>
		{({ loading, data, client }) => {
			if (loading) return <div>Loading...</div>;
			return (
				<Mutation
					mutation={NEW_LIST}
					update={(cache, { data: { newList } }) => {
						const { task: taskInCache } = cache.readQuery({
							query: FIND_TASK,
							variables: { id: task },
						});
						taskInCache.lists.push(newList);

						cache.writeQuery({
							query: FIND_TASK,
							variables: { id: task },
							data: { task: taskInCache },
						});
					}}
				>
					{newList => {
						return (
							<PosedWrapper pose={openList ? 'visible' : 'hidden'}>
								<ListForm
									newList={content =>
										newList({
											variables: { input: { content, task } },
										})
									}
								/>
								<ListItems>
									{data.task.lists.map(({ id, content }) => (
										<li key={id}>{content}</li>
									))}

									<button
										type="button"
										onClick={() => {
											client.writeData({ data: { openList: false } });
											history.push('/me/dashboard');
										}}
									>
										Save list
									</button>
								</ListItems>
							</PosedWrapper>
						);
					}}
				</Mutation>
			);
		}}
	</Query>
);

export default List;
