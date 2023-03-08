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

export const formatDateTime = (isostringOrDate: string | Date) => {
	const date =
		typeof isostringOrDate === 'string'
			? new Date(isostringOrDate)
			: isostringOrDate

	return `${days[date.getUTCDay()]}, ${
		months[date.getUTCMonth()]
	} ${date.getUTCDate()}, ${date.getUTCFullYear()}: ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC`
}

export const formatDate = (isostringOrDate: string | Date): string => {
	const date =
		typeof isostringOrDate === 'string'
			? new Date(isostringOrDate)
			: isostringOrDate

	return `${days[date.getUTCDay()]}, ${
		months[date.getUTCMonth()]
	} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}
