import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListItem = styled.li`
	display: flex;
	justify-content: flex-start;
	position: relative;

	> * {
		flex: 1;
		padding: 2rem;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;

		&:last-child {
			> * {
				padding: 1rem;
				cursor: pointer;
			}
		}
	}

	&:nth-child(even) {
		background-color: #eee;
	}

	&:hover > span:last-child {
		visibility: visible;
		background-color: tomato;
		color: white;
	}
`;

const Controllers = styled.span`
	position: absolute;
	left: 100%;
	visibility: hidden;
`;

const Anchor = styled(Link)`
	text-decoration: inherit;
	color: inherit;
`;

const Task = ({ id, name, description, dueDate }) => (
	<ListItem>
		<span>{name}</span>
		<span>{description}</span>
		<span>{dueDate}</span>
		<Controllers>
			<span>
				<Anchor to={`/me/edit/${id}`}>O</Anchor>
			</span>
			<span>X</span>
		</Controllers>
	</ListItem>
);

export default Task;
