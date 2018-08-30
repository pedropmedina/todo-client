import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { User, LogOut } from 'react-feather';
import posed from 'react-pose';

import tasksSummary from '../selectors/tasksSummary';

// Styles -----------------------------------
const HeaderWrapper = styled.header`
	height: 35rem;
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
		border-right: 0.2rem solid #fff;
		padding: 2rem 5rem;
		margin-right: 5rem;
		font-size: 3rem;
		letter-spacing: 0.2rem;

		> span {
			display: block;
			margin-bottom: 0.5rem;
			font-weight: 500;

			&:last-child {
				font-size: 2rem;
				font-weight: 300;
			}
		}
	}
`;

const Topbar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding: 1rem;

	> span {
		margin-right: 10rem;
		height: 3rem;

		&:first-child {
			width: 20rem;
			margin-right: 3rem;

			> input {
				width: 100%;
				height: 100%;
				border: none;
				text-indent: 1rem;
				background-color: rgba(255, 255, 255, 0.2);
				color: #fff;
				letter-spacing: 0.1rem;
				font-size: 1.2rem;
				outline: none;
				border-radius: 0.2rem;

				&::placeholder {
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}

		/* span containing user modal*/
		&:last-child {
			width: 3rem;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
	}
`;

const UserModal = styled.span`
	position: absolute;
	top: 130%;
	border-radius: 0.4rem;
	box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
	background-color: #fff;
	color: #aaa;
	padding: 1rem;
	visibility: ${({ openUserModal }) => (openUserModal ? 'visible' : 'hidden')};

	> ul {
		list-style: none;

		> li {
			display: flex;
			padding: 0.5rem 1.5rem;

			&:not(:last-child) {
				border-bottom: 0.1rem solid #ddd;
			}

			&:hover {
				color: #000;
				cursor: pointer;
			}

			> * {
				font-size: 1.5rem;

				&:not(:last-child) {
					margin-right: 1.5rem;
				}
			}
		}
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

const Summary = styled.div`
	> p {
		padding: 2rem 0;
		font-size: 2rem;
		text-decoration: underline rgba(255, 255, 255, 0.2);
	}
`;

const DRP = styled(DateRangePicker)`
	.react-daterange-picker__button {
		background-color: rgba(255, 255, 255, 0.2);
		color: transparent;
		border: none;
		padding: 1rem;
	}

	.react-date-picker__button__input > * {
		font-size: 1.6rem;
		color: #000;
	}

	.react-calendar {
		border: none;
		padding: 1rem;
		box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.09);
	}

	.react-calendar__month-view__weekdays {
		color: #aaa;
		font-size: 1.2rem;
	}
`;

// Pose --------------------------------------
const config = {
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			default: { ease: 'easeIn', duration: 100 },
		},
	},
	hidden: {
		opacity: 0,
		scale: 0.5,
		transition: {
			default: { ease: 'easeOut', duration: 150 },
		},
	},
};

const PosedUserModal = posed(UserModal)(config);

// Graphql queries ----------------------------------
const GET_LOCAL_STATE = gql`
	{
		filter @client
		dates @client
		currentDate @client
	}
`;

// Functionality ---------------------------------------------
const FILTER_TYPES = ['all', 'active', 'completed', 'calendar'];

class Header extends Component {
	state = {
		openUserModal: false,
	};

	modal = React.createRef();

	componentWillMount() {
		document.addEventListener('mousedown', this.handleToggleUserModal);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleToggleUserModal);
	}

	handleToggleUserModal = e => {
		if (this.modal.current.contains(e.target)) {
			this.setState({ openUserModal: true });
			return;
		}

		this.setState({ openUserModal: false });
	};

	render() {
		return (
			<Query query={GET_LOCAL_STATE}>
				{({ loading, error, data, client }) => {
					if (loading) return <div>Loading...</div>;

					const { filter, dates, currentDate } = data;
					return (
						<HeaderWrapper filter={filter}>
							<Topbar>
								<span>
									<input type="text" placeholder="search..." />
								</span>
								<span ref={this.modal}>
									<i>
										<User />
									</i>
									<PosedUserModal
										pose={this.state.openUserModal ? 'visible' : 'hidden'}
										openUserModal={this.state.openUserModal}
									>
										<ul>
											<li
												onClick={() => {
													localStorage.removeItem('authorization');
													this.props.push('/auth/login');
												}}
											>
												<i>Logout</i>
												<i>
													<LogOut />
												</i>
											</li>
										</ul>
									</PosedUserModal>
								</span>
							</Topbar>

							<h3>
								<span>{moment(currentDate).format('ddd')},</span>
								<span>{moment(currentDate).format('MMM Do, YYYY')}</span>
							</h3>
							{filter === 'all' ? (
								<Summary>
									<p>{tasksSummary(this.props.tasks, data)}</p>
								</Summary>
							) : filter === 'active' ? (
								<Summary>
									<p>{tasksSummary(this.props.tasks, data)}</p>
								</Summary>
							) : filter === 'completed' ? (
								<Summary>
									<p>{tasksSummary(this.props.tasks, data)}</p>
								</Summary>
							) : filter === 'calendar' ? (
								<Summary>
									<p>{tasksSummary(this.props.tasks, data)}</p>
									<DRP
										value={dates ? dates.map(date => new Date(date)) : null}
										onChange={dates => {
											if (dates) {
												const timeStamps = dates.map(date => date.getTime());
												client.writeData({ data: { dates: timeStamps } });
											} else {
												client.writeData({ data: { dates: null } });
											}
										}}
									/>
								</Summary>
							) : null}

							<Filterbar>
								<FilterTabs>
									{FILTER_TYPES.map(filter => (
										<Tab
											key={`FILTER_${filter}`}
											filter={data.filter}
											onClick={() => client.writeData({ data: { filter } })}
										>
											{filter}
										</Tab>
									))}
								</FilterTabs>
							</Filterbar>
						</HeaderWrapper>
					);
				}}
			</Query>
		);
	}
}

export default Header;
