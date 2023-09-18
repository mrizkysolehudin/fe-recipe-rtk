export function splitSentencesToPoints(text) {
	if (!text) return;

	const arrayWords = text
		.split(/[.,-]/)
		.filter(Boolean)
		.map((item) => item.trim());

	return arrayWords;
}
