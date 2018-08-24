import moment from 'moment';

export default (tasks, { filter, dates, currentDate }) => {
	return tasks.filter(task => {
		const dueDate = moment(task.dueDate);
		const focusedDay = dueDate.isSame(currentDate, 'day');

		const all = filter === 'all' ? focusedDay : true;
		const active =
			filter === 'active' ? focusedDay && task.completed === false : true;
		const completed =
			filter === 'completed' ? focusedDay && task.completed === true : true;
		const calendar =
			filter === 'calendar' && dates
				? dueDate.isSameOrAfter(dates[0], 'day') &&
				  dueDate.isSameOrBefore(dates[1], 'day')
				: !dates
					? focusedDay
					: true;

		return all && active && completed && calendar;
	});
};
