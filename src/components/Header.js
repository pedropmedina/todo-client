import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => (
	<header>
		<ul>
			<li>show all</li>
			<li>show active</li>
			<li>show completed</li>
			<li>sort by date</li>
			<li>search all</li>
			<li>
				profile
				<Link to="/auth/login">Signout</Link>
			</li>
		</ul>
		<div>Date</div>
		{/* <NavLink to="/auth/login">Login</NavLink>
		<NavLink to="/auth/signup">Signup</NavLink>
		<NavLink to="/me/dashboard">Dashboard</NavLink>
		<NavLink to="/add">AddTask</NavLink> */}
	</header>
);

export default Header;
