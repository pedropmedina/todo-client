import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<header>
		<NavLink to="/auth/login">Login</NavLink>
		<NavLink to="/auth/signup">Signup</NavLink>
		<NavLink to="/me/dashboard">Dashboard</NavLink>
		{/* <NavLink to="/add">AddTask</NavLink> */}
	</header>
);

export default Header;
