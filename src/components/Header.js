import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
		margin-right: 3rem;
		height: 3rem;

		&:first-child {
			width: 20rem;

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

				&::placeholder {
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}

		&:last-child {
			width: 3rem;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.2);
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

const GET_FILTER_AND_DATES = gql`
	{
		filter @client
		dates @client
	}
`;

const FILTER_TYPES = ['all', 'active', 'completed', 'calendar'];

const Header = () => {
	return (
		<Query query={GET_FILTER_AND_DATES}>
			{({ loading, error, data, client }) => {
				if (loading) return <div>Loading...</div>;

				const { filter, dates } = data;
				return (
					<HeaderWrapper filter={filter}>
						<Topbar>
							<span>
								<input type="text" placeholder="search..." />
							</span>
							<span />
						</Topbar>
						<h3>
							<span>{moment().format('ddd')},</span>
							<span>{moment().format('MMM Do, YYYY')}</span>
						</h3>
						{filter === 'all' ? (
							<Summary>
								<p>This is the preview for all...</p>
							</Summary>
						) : filter === 'active' ? (
							<Summary>
								<p>This is the preview for active...</p>
							</Summary>
						) : filter === 'completed' ? (
							<Summary>
								<p>This is the preview for completed...</p>
							</Summary>
						) : filter === 'calendar' ? (
							<Summary>
								<p>This is the preview for calendar...</p>
								<DRP
									value={dates.map(date => new Date(date))}
									onChange={dates => {
										const timeStamps = dates.map(date => date.getTime());
										client.writeData({ data: { dates: timeStamps } });
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
										onClick={event => client.writeData({ data: { filter } })}
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
};

export default Header;
