import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import '../../public/styles/index.css';

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

	> span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: green;
`;

const Dashboard = () => (
	<Wrapper>
		<CancelButton to="/me/add">
			<span>ADD</span>
		</CancelButton>
	</Wrapper>
);

export default Dashboard;
