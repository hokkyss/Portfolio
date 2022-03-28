const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'June',
	'July',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

export const formatDate = (isostring: string): string => {
	const date = new Date(isostring)

	return `${days[date.getDay()]}, ${
		months[date.getMonth()]
	} ${date.getDate()}, ${date.getFullYear()}`
}
