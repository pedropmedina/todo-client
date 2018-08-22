import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import styled, { injectGlobal } from 'styled-components';

import AppRouter from './routers/AppRouter';

// expose history api to be passed to Router and used accross app
const history = createHistory();

injectGlobal`
	html {
		font-size: 62.5%;
		height: 100%;
		/* padding: 2rem;
		background: rgb(238,174,189);
		background: radial-gradient(circle, rgba(238,174,189,1) 0%, rgba(233,204,148,1) 100%); */

	}
	body {
		box-sizing: border-box;
		font-family: 'Helvetica';
		line-height: 1.3;
		height: 100%;
		position: relative;
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

ReactDOM.render(<AppRouter />, document.getElementById('root'));
