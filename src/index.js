import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import styled, { injectGlobal } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

import AppRouter from './routers/AppRouter';

// expose history api to be passed to Router and used accross app
const history = createHistory();

injectGlobal`
	html {
		font-size: 62.5%;
		height: 100%;
	}
	body {
		box-sizing: border-box;
		font-family: 'Helvetica';
		line-height: 1.3;
		height: 100%;
	}
	*,
	*::before,
	*::after {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
	}
`;

// Pass history as prop to AppRouter to avoid
// "warning: You cannot change <Router history>"
// while using hot module reload
/*
ReactDOM.render(
	<AppRouter history={history} />,
	document.getElementById('root'),
);
*/

// ---------------- Pose's configs
const config = {
	visible: {
		x: 0,
		y: props => console.log(props) || 400,
		opacity: 1,
		scale: 2,
		transition: {
			opacity: { ease: 'easeOut', duration: 300 },
			default: { ease: 'linear', duration: 500 },
		},
	},
	hidden: {
		x: 0,
		y: props => 0,
		scale: 0.5,
		opacity: 0,
		transition: {
			y: { ease: 'easeIn', duration: 1000 },
			scale: { ease: 'easeIn', duration: 1000 },
			opacity: { ease: 'easeOut', duration: 2000 },
			default: { ease: 'linear', duration: 500 },
		},
	},
};

const sidebarConfig = {
	open: { x: '0%', delayChildren: 300, staggerChildren: 300 },
	closed: { x: '-150%', delay: 500, staggerChildren: 20 },
};

const sidebarConfig1 = {
	visible: {
		opacity: 1,
		transition: {
			opacity: { ease: 'easeIn', duration: 300 },
		},
		delayChildren: 300,
		staggerChildren: 50,
	},
	hidden: {
		opacity: 0,
		delay: 500,
		staggerChildren: 20,
	},
};

const itemConfig = {
	open: {
		y: 0,
		opacity: 1,
	},
	closed: {
		y: 20,
		opacity: 0,
	},
};

const itemConfig1 = {
	enter: {
		opacity: 1,
		y: 0,
		x: '-100%',
	},
	exit: {
		opacity: 0,
		y: 20,
		x: '100%',
	},
	draggable: 'y',
	// dragEnd: { transition: { type: 'spring' } },
};

// ---------------- Pose's configs

const Main = styled.div`
	height: 100vh;
	width: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

// const StyledBox = styled(Box)`
// 	width: 200px;
// 	height: 200px;
// 	background-color: papayawhip;
// `;

const StyledSidebar = styled.ul`
	height: 100%;
	background-color: #eee;
	padding: 40px;
	width: 400px;
`;

const StyledItem = styled.li`
	background-color: ${props => console.log(props) || props.bg};
	margin-bottom: 20px;
	list-style: none;
	padding: 20px;
`;

// const Box = posed.div(config);
const Sidebar = posed(StyledSidebar)(sidebarConfig);
const Item = posed(StyledItem)(itemConfig);
const Sidebar1 = posed(StyledSidebar)(sidebarConfig1);
const Item1 = posed(StyledItem)(itemConfig1);

class Comp extends React.Component {
	state = { isVisible: true, isOpen: false };

	render() {
		return (
			<Main
			// onClick={() =>
			// 	this.setState(({ isVisible, isOpen }) => ({ isOpen: !isOpen }))
			// }
			>
				<Sidebar pose={this.state.isOpen ? 'open' : 'closed'}>
					<Item bg="red" />
					<Item bg="yellow" />
					<Item bg="tomato" />
					<Item bg="cyan" />
					<Item bg="blue" />
				</Sidebar>
				{/* <StyledBox pose={this.state.isVisible ? 'visible' : 'hidden'} /> */}

				<Sidebar1 pose={this.state.isVisible ? 'visible' : 'close'}>
					<PoseGroup>
						<Item1 bg="red" key={1} />
						<Item1 bg="blue" key={2} />
						<Item1 bg="green" key={4} />
						<Item1 bg="orange" key={3} />
						<Item1 bg="purple" key={5} />
					</PoseGroup>
				</Sidebar1>
			</Main>
		);
	}
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
