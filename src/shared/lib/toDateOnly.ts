export const toDateOnly = (date: Date): string => {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
};

export const toDateWithHour = (date: Date): string => {
	const base = new Date(date);
	const hasExplicitTime = base.getHours() !== 0 || base.getMinutes() !== 0 || base.getSeconds() !== 0 || base.getMilliseconds() !== 0;
	const hour = hasExplicitTime ? base.getHours() : new Date().getHours();

	const y = base.getFullYear();
	const m = String(base.getMonth() + 1).padStart(2, '0');
	const d = String(base.getDate()).padStart(2, '0');
	const h = String(hour).padStart(2, '0');

	return `${y}-${m}-${d}-${h}`;
};
