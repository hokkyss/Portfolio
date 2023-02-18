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

export const formatDate = (isostringOrDate: string | Date): string => {
	const date =
		typeof isostringOrDate === 'string'
			? new Date(isostringOrDate)
			: isostringOrDate

	return `${days[date.getDay()]}, ${
		months[date.getMonth()]
	} ${date.getDate()}, ${date.getFullYear()}`
}
