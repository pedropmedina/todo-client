import React from 'react';
import styled from 'styled-components';

import Task from './Task';

const Table = styled.article`
	width: 60rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: papayawhip;
`;

const TableHeader = styled.header`
	display: flex;
	justify-content: flex-start;
	background-color: tomato;

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
					background-color: tomato;
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
				border: none;
				border-radius: 50%;
				background-color: crimson;

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

const TasksList = props => (
	<Table>
		<TableHeader>
			<h4>
				<input type="checkbox" id="toggleAll" />
				<label htmlFor="toggleAll" />
			</h4>
			<h4>Name</h4>
			<h4>Description</h4>
			<h4>Due on</h4>
		</TableHeader>
		<ul>
			{props.tasks.map(({ id, ...task }) => (
				<Task key={id} {...task} id={id} />
			))}
		</ul>
	</Table>
);

export default TasksList;
