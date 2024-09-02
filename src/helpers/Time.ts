import { getLongDays } from "./Storage";

export const getFormattedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

export const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
}

export const isLongDay = (date: Date) => {
    const day = date.getDay();
    const longDays = getLongDays()
    return longDays.includes(day);
}

export const getMonthName = (month: number) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return new Date(2024, month, 1).toLocaleDateString('es-ES', options);
}

export const getTimeFromNow = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}    

export const convertMinutesToHHMM = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
};

export const convertHHMMToMinutes = (hhmm: string): number => {
    const [hours, minutes] = hhmm.split(':').map(Number);
    return hours * 60 + minutes;
};