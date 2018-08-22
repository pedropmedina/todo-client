import React, { Component } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
	display: block;
	width: 70rem;
	height: 8rem;
	/* margin: -8rem 0 5rem 0; */
	margin: -4rem auto;
	background-color: transparent;
	border: none;
	text-indent: 5rem;
	font-size: 2.5rem;
	color: #aaa;
	outline: none;
	letter-spacing: 0.1rem;
	font-weight: 300;
	/* background-color: rgba(255, 255, 255, 0.1); */
	background-color: white;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
	/* border: 0.1rem solid grey; */

	&::placeholder {
		color: inherit;
	}
`;

class Searchbar extends Component {
	state = {
		searchText: '',
	};

	handleSearchText = event => {
		const { value } = event.target;
		this.setState(() => ({ searchText: value }));
	};

	render() {
		const { searchText } = this.state;
		return (
			<SearchInput
				type="text"
				value={searchText}
				placeholder="search on..."
				onChange={this.handleSearchText}
			/>
		);
	}
}

export default Searchbar;
