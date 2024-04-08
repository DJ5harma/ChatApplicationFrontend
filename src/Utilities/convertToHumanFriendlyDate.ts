export default function convertToHumanFriendlyDate(dateStr: string) {
	// Convert string to Date object
	const dateObj = new Date(dateStr);

	// Convert to human-friendly format
	const humanFriendlyDate = dateObj.toLocaleString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return humanFriendlyDate;
}
