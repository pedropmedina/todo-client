import { matchPath } from 'react-router-dom';

export default pathname => match => matchPath(pathname, match) !== null;
