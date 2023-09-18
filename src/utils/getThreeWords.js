export function getFirstThreeWords(title) {
	const words = title?.split(" ");
	const firstThreeWords = words?.slice(0, 3);
	return firstThreeWords?.join(" ");
}
