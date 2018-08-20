import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
	background: rgb(195, 57, 34);
	background: linear-gradient(
		180deg,
		rgba(195, 57, 34, 1) 0%,
		rgba(254, 254, 254, 1) 100%
	);
`;

const Topbar = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 7rem;
	list-style: none;
	padding: 2rem;
	background-color: transparent;
	color: white;
	font-size: 1.2rem;
	letter-spacing: 0.1rem;
	box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.05);

	/* all outer li */
	> * {
		flex: 1;

		/* first outer li */
		&:first-child {
			flex: 3;

			/* first outer li > ul > li > span */
			> ul > li > span {
				/* second span in li > ul > li containing input and label*/
				&:last-child {
					border-right: 0.1rem solid rgb(244, 89, 66);
					padding-right: 1rem;

					> input {
						visibility: hidden;
						&:checked + label {
							background-color: rgb(60, 209, 134);
						}
						&:checked + label::after {
							left: 0;
						}
					}

					> label {
						display: inline-block;
						width: 5rem;
						height: 2.5rem;
						background-color: rgb(244, 89, 66);
						position: relative;
						border-radius: 1.5rem;

						&::after {
							content: '';
							display: inline-block;
							width: 2.5rem;
							border-radius: 50%;
							background-color: white;
							position: absolute;
							right: 0;
							top: 0;
							bottom: 0;
							box-shadow: 0 0.5rem 0.7rem rgba(0, 0, 0, 0.2);
						}
					}
				}
			}
		}

		/*  second outer li  */
		&:last-child {
			flex: 1;

			/* second outer li > ul */
			> * {
				justify-content: flex-end;
			}
		}

		/* all inner ul */
		> * {
			display: flex;
			justify-content: flex-start;
			list-style: none;

			/* all inner li */
			> * {
				margin: 1rem;
				display: flex;
				align-items: center;
			}
		}
	}
`;

const Hero = styled.div`
	height: 25rem;
	display: flex;
	justify-content: center;
	align-items: center;

	> span {
		font-size: 3rem;
		color: white;
	}
`;

const Header = () => (
	<HeaderWrapper>
		<Topbar>
			<li>
				<ul>
					<li>
						<span>all</span>
						<span>
							<input type="radio" id="all" name="filter" />
							<label htmlFor="all" />
						</span>
					</li>
					<li>
						<span>active</span>
						<span>
							<input type="radio" id="active" name="filter" />
							<label htmlFor="active" />
						</span>
					</li>
					<li>
						<span>completed</span>
						<span>
							<input type="radio" id="completed" name="filter" />
							<label htmlFor="completed" />
						</span>
					</li>
					<li>sort by date</li>
				</ul>
			</li>

			<li>
				<ul>
					<li>search all</li>
					<li>
						profile
						<Link to="/auth/login">Signout</Link>
					</li>
				</ul>
			</li>
		</Topbar>
		<Hero>
			<span>{Date.now()}</span>
		</Hero>
	</HeaderWrapper>
);

export default Header;
