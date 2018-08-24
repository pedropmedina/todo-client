import React, { Component } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

class ListForm extends Componnet {
	state = {
		listText: '',
	};

	handleListText = event => {
		const { value } = event.target;
		this.setState({ listText: value });
	};

	render() {
		const { listText } = this.state;
		return (
			<form>
				<input
					type="text"
					placeholder="Go ahead and add to your list."
					value={listText}
					onChange={this.handleListText}
				/>
				<button>Add</button>
			</form>
		);
	}
}

export default ListForm;
