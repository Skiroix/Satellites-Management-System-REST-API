export default function dateFormatter(
	timestamp: number
): [number, number, number, string] {
	const year = new Date(timestamp).getFullYear();
	const month = new Date(timestamp).getMonth() + 1;
	const day = new Date(timestamp).getDate();

	const _day = day < 10 ? `0${day}` : day;
	const _month = day < 10 ? `0${month}` : month;

	return [day, month, year, `${year}-${_month}-${_day}`];
}
