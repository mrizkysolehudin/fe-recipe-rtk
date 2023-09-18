export function formatDate(dateString) {
	const currentDate = new Date();
	const inputDate = new Date(dateString);

	const miliSeconds = currentDate - inputDate;
	const seconds = Math.floor(miliSeconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (months >= 1) {
		return `${months} months ago`;
	} else if (days >= 1) {
		return `${days} days ago`;
	} else if (hours >= 1) {
		return `${hours} hours ago`;
	} else if (minutes >= 1) {
		return `${minutes} minutes ago`;
	} else if (seconds >= 1) {
		return `${seconds} seconds ago`;
	} else {
		return "Just now";
	}
}
