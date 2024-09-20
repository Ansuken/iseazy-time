import { Breaks } from "../types/Breaks";
import { DayFilled } from "../types/DayFilled";
import { Schedule } from "../types/Schedule";
import { getSheetsFromStorage } from "./Storage";
import { convertHHMMToMinutes } from "./Time";

export const getDifferencesBetweenTimes = (startTime: string, endTime: string): string => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const getSumBetweenTimes = (startTime: string, endTime: string): string => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const getRestTime = ({day}: {day: DayFilled}) => {
    const breaks: Breaks = JSON.parse(localStorage.getItem('breaksTime') ?? '{}')
    const schedule: Schedule = JSON.parse(localStorage.getItem('schedule') ?? '{}')
    const dayType = day.isLongDay ? schedule.longDay : schedule.shortDay;

    const grossStartEndMinutes = convertHHMMToMinutes(getDifferencesBetweenTimes(dayType.start, dayType.end))
    const grossBreaksMinutes = breaks.shortBreak + (day.isLongDay ? breaks.longBreak : 0)
    const totalNetExpectedMinutes = grossStartEndMinutes - grossBreaksMinutes

    const userStartEndMinutes = convertHHMMToMinutes(getDifferencesBetweenTimes(day.startDate, day.endDate))

    const userDifferencesQuickBreaks = convertHHMMToMinutes(getDifferencesBetweenTimes(day.startQuickBreak, day.endQuickBreak));
    const userDifferencesBreaks = convertHHMMToMinutes(getDifferencesBetweenTimes(day.startBreak, day.endBreak));
    
    
    const userTimeBreaksMinutes = day.isLongDay ?
        (userDifferencesQuickBreaks + userDifferencesBreaks) :
        userDifferencesQuickBreaks
    
    
    const userNetMinutes = userStartEndMinutes - userTimeBreaksMinutes


    return userNetMinutes - totalNetExpectedMinutes;
}

export const isEmpty = ({day}:{day: DayFilled}) => {
    return day.startDate === '00:00' || 
            day.endDate === '00:00' || 
            day.startQuickBreak === '00:00' ||
            day.endQuickBreak === '00:00' ||
             (day.isLongDay && ( day.startBreak === '00:00' || day.endBreak === '00:00') )
}

export const getTotalMinutesFromSheet = ({sheet}: {sheet:DayFilled[]}): number => {
    let totalMinutes = 0
    if (!sheet) return 0
    sheet.forEach(day => {
        if (isEmpty({day})) return
        const restTime = getRestTime({day})
        totalMinutes += restTime
    })
    return totalMinutes
}

export const getTotalMinutesFromAllSheets = (): number => {
    const sheets = getSheetsFromStorage()
    const totalMinutes = getTotalMinutesFromSheet({sheet: sheets}) || 0
    return totalMinutes
}