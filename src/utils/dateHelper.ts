import { formatDistanceToNow, subMinutes, subSeconds, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'; // Correct import for time zone conversion

// Function to convert a full date model to IST and format as `yyyy-MM-dd HH:mm:ss`
export function convertToISTAndFormat(date: Date): string {
    const zonedDate = toZonedTime(date, 'Asia/Kolkata'); // Convert to IST
    return `${zonedDate.getFullYear()}-${String(zonedDate.getMonth() + 1).padStart(2, '0')}-${String(zonedDate.getDate()).padStart(2, '0')} ${String(zonedDate.getHours()).padStart(2, '0')}:${String(zonedDate.getMinutes()).padStart(2, '0')}:${String(zonedDate.getSeconds()).padStart(2, '0')}`;
}

// Function to convert a full date model to IST and format as `yyyy-MM-dd`
export function convertToYYYYMMDD(date: Date): string {
    const zonedDate = toZonedTime(date, 'Asia/Kolkata'); // Convert to IST
    return `${zonedDate.getFullYear()}-${String(zonedDate.getMonth() + 1).padStart(2, '0')}-${String(zonedDate.getDate()).padStart(2, '0')}`;
}

// Function to convert a full date model to IST and format as `yyyy-Month-dd`
export function convertToYYYYMonthDD(date: Date): string {
    const zonedDate = toZonedTime(date, 'Asia/Kolkata'); // Convert to IST
    const month = zonedDate.toLocaleString('en-us', { month: 'long' });
    return `${zonedDate.getFullYear()}-${month}-${String(zonedDate.getDate()).padStart(2, '0')}`;
}

// Function to convert a full date model to IST and format as `Month dd, yyyy`
export function convertToMonthDDYYYY(date: Date): string {
    const zonedDate = toZonedTime(date, 'Asia/Kolkata'); // Convert to IST
    const month = zonedDate.toLocaleString('en-us', { month: 'long' });
    return `${month} ${String(zonedDate.getDate()).padStart(2, '0')}, ${zonedDate.getFullYear()}`;
}

// Function to convert a full date to a human-readable time ago format
export function timeAgo(date: Date): string {
    const zonedDate = toZonedTime(date, 'Asia/Kolkata'); // Convert to IST
    return formatDistanceToNow(zonedDate, { addSuffix: true, includeSeconds: true });
}
