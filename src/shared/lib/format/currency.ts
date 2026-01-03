export const formatCurrency = (currency: string): string => {
	for (let i = currency.length - 3; i > 0; i -= 3) {
		currency = currency.slice(0, i) + '.' + currency.slice(i);
	}
	return currency;
};
