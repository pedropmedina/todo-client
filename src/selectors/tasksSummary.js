import moment from 'moment';

import filterTasks from './filterTasks';

export default (tasks, data) => {
	const { filter, dates, currentDate } = data;
	const stats = filterTasks(tasks, data);
	switch (filter) {
		case 'all':
			return `Showing ${stats.length} tasks for this day.`;
		case 'completed':
			return `You have completed ${stats.length} tasks.`;
		case 'active':
			return `There are ${stats.length} active for this day`;
		case 'calendar':
			if (dates) {
				return `Showing ${stats.length} tasks from ${moment(dates[0]).format(
					'MMM Do, YYYY',
				)} to ${moment(dates[1]).format('MMM Do, YYYY')}`;
			}
			return 'Select a range to show tasks.';
	}
};
