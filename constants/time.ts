export enum Time {
	MILLISECOND = 1,
	SECOND = 1000 * MILLISECOND,
	MINUTE = 60 * SECOND,
	HOUR = 60 * MINUTE,
	DAY = 24 * HOUR,
}

export const DEFAULT_TIMEOUT = 3 * Time.SECOND
