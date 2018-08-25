import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

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

const List = ({ openList, task }) => (
	<PosedWrapper pose={openList ? 'visible' : 'hidden'}>
		<ListForm task={task} />
		<ListItems>
			<li>One item</li>
		</ListItems>
	</PosedWrapper>
);

export default List;
