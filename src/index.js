import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import styled, { injectGlobal } from 'styled-components';

import AppRouter from './routers/AppRouter';

// expose history api to be passed to Router and used accross app
export const history = createHistory();

injectGlobal`
	html {
		font-size: 62.5%;
		height: 100%;
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

ReactDOM.render(
	<AppRouter history={history} />,
	document.getElementById('root'),
);
