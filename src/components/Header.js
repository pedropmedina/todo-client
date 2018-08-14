import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<header>
		<NavLink to="/login">Login</NavLink>
		<NavLink to="/signup">Signup</NavLink>
		<NavLink to="/dashboard">Dashboard</NavLink>
		<NavLink to="/add">AddTask</NavLink>
	</header>
);

export default Header;
