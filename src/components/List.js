import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ListForm from './ListForm';

const ListWrapper = styled.div`
	width: 70rem;
	margin: 3rem auto;
	/* border: 0.1rem solid #eee; */
	background-color: #eee;
	padding: 2rem;
`;

const ListItems = styled.ul`
	margin-top: 2rem;
	list-style: none;
	font-size: 1.6rem;
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

const FIND_LISTS = gql`
	query {
		lists: findLists {
			id
			content
		}
	}
`;

const List = ({ openList, task }) => (
	<Query query={FIND_TASK} variables={{ id: task }}>
		{({ loading, data }) => {
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
