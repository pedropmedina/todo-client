import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import '../../public/styles/index.css';

const style1 = {
	backgroundColor: 'blue',
	position: 'absolute',
	top: '30px',
	bottom: 0,
	left: 0,
	right: 0,
};

const style2 = {
	width: '50px',
	height: '50px',
	backgroundColor: 'yellow',
	position: 'absolute',
	bottom: '20px',
	left: '20px',
};

const Dashboard = () => <div>dashboard</div>;

export default Dashboard;
