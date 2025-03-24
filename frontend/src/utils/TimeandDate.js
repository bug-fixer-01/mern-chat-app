export function extractTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${padZero(hours)}:${minutes} ${ampm}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}