import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const HeaderWrapper = styled.header`
	height: 30rem;
	background-color: #eee;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	letter-spacing: 0.1rem;

	${({ filter }) =>
		filter === 'all'
			? css`
					background: linear-gradient(90deg, #3f2b96 0%, #a8c0ff 100%);
			  `
			: filter === 'active'
				? css`
						background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
				  `
				: filter === 'completed'
					? css`
							background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
					  `
					: filter === 'calendar'
						? css`
								background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
						  `
						: false};

	> h3 {
		border-right: 0.1rem solid #fff;
		padding: 2rem;
		margin-right: 2rem;
		font-size: 3rem;
	}
`;

const Filterbar = styled.div`
	background-color: rgba(255, 255, 255, 0.05);
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const FilterTabs = styled.ul`
	width: 70rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
`;

const Tab = styled.li`
	flex: 1;
	list-style: none;
	padding: 2rem;
	font-size: 1.6rem;
	color: #fff;
	cursor: pointer;
	text-align: center;
	background-color: inherit;
	position: relative;
	letter-spacing: 0.15rem;
	user-select: none;

	${({ filter, children }) =>
		filter === children && children === 'all'
			? css`
					background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
					background-clip: text;
					-webkit-background-clip: text;
					color: transparent;

					&::after {
						background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
					}
			  `
			: filter === children && children === 'active'
				? css`
						background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
						background-clip: text;
						-webkit-background-clip: text;
						color: transparent;

						&::after {
							background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
						}
				  `
				: filter === children && children === 'completed'
					? css`
							background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
							background-clip: text;
							-webkit-background-clip: text;
							color: transparent;

							&::after {
								background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
							}
					  `
					: filter === children && children === 'calendar'
						? css`
								background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
								background-clip: text;
								-webkit-background-clip: text;
								color: transparent;

								&::after {
									background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
								}
						  `
						: null};

	&::after {
		content: '';
		display: block;
		height: 0.7rem;
		width: 100%;
		position: absolute;
		top: 100%;
		/* bottom: 0; */
		left: 0;
		transition: 0.7s;
	}
`;

const FILTER_TYPES = ['all', 'active', 'completed', 'calendar'];

class Header extends Component {
	state = {
		filter: 'all',
	};

	handleFilter = (event, filter) => {
		this.setState(() => ({ filter }));
	};

	render() {
		const { filter } = this.state;
		return (
			<HeaderWrapper filter={filter}>
				<h3>{Date.now()}</h3>
				{filter === 'all' ? (
					<div>
						<p>This is the preview for all...</p>
					</div>
				) : filter === 'active' ? (
					<div>
						<p>This is the preview for active...</p>
					</div>
				) : filter === 'completed' ? (
					<div>
						<p>This is the preview for completed...</p>
					</div>
				) : filter === 'calendar' ? (
					<div>
						<p>This is the preview for calendar...</p>
						<input type="text" placeholder="start date" />
						<input type="text" placeholder="end date" />
					</div>
				) : null}

				<Filterbar>
					<FilterTabs>
						{FILTER_TYPES.map(filter => (
							<Tab
								key={`FILTER_${filter}`}
								filter={this.state.filter}
								onClick={event => this.handleFilter(event, filter)}
							>
								{filter}
							</Tab>
						))}
					</FilterTabs>
				</Filterbar>
			</HeaderWrapper>
		);
	}
}

export default Header;
